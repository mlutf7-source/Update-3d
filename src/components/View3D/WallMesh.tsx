import React from 'react';
import * as THREE from 'three';
import type { WallBox } from '../../core/wallSegments3D';
import { INTERIOR_PAINT_COLOR } from './helpers/wallHelpers';

interface Props {
  box: WallBox;
    matProps: any;
      texture: THREE.Texture | null;
        repeatScale: number;
          /** ✅ عند true — يُعامل كسور: نسيج على الجانبين + لا طلاء داخلي */
            isFence?: boolean;
            }

            export const WallMesh: React.FC<Props> = ({
              box,
                matProps,
                  texture,
                    repeatScale,
                      isFence = false,
                      }) => {
                        const materials = React.useMemo(() => {
                            const [w, h] = box.size;

                                // ✅ مواد الجدار الخارجي (مع نسيج إن وُجد)
                                    const exteriorMaterial = (() => {
                                          if (!texture) {
                                                  return new THREE.MeshStandardMaterial({ ...matProps });
                                                        }
                                                              const tex = texture.clone();
                                                                    tex.needsUpdate = true;
                                                                          tex.repeat.set(w * repeatScale, h * repeatScale);
                                                                                return new THREE.MeshStandardMaterial({ ...matProps, map: tex });
                                                                                    })();

                                                                                        // ✅ الطلاء الداخلي (أو نسيج خارجي للسور على الجانبين)
                                                                                            const interiorMaterial = isFence
                                                                                                  ? exteriorMaterial
                                                                                                        : new THREE.MeshStandardMaterial({
                                                                                                                  color: INTERIOR_PAINT_COLOR,
                                                                                                                            roughness: 0.9,
                                                                                                                                      metalness: 0.0,
                                                                                                                                              });

                                                                                                                                                  // ✅ المادة المحايدة للأوجه الصغيرة (أعلى، أسفل، جوانب)
                                                                                                                                                      const neutralMaterial = (box.isExterior || isFence) ? exteriorMaterial : interiorMaterial;

                                                                                                                                                          // ✅ للسور: كل الأوجه بنسيج خارجي (جدار سور مستقل)
                                                                                                                                                              if (isFence) {
                                                                                                                                                                    return [exteriorMaterial, exteriorMaterial, exteriorMaterial, exteriorMaterial, exteriorMaterial, exteriorMaterial];
                                                                                                                                                                        }

                                                                                                                                                                            // ✅ جدار داخلي: طلاء على كل الأوجه
                                                                                                                                                                                if (!box.isExterior) {
                                                                                                                                                                                      return [interiorMaterial, interiorMaterial, neutralMaterial, neutralMaterial, interiorMaterial, interiorMaterial];
                                                                                                                                                                                          }

                                                                                                                                                                                              // ✅ جدار خارجي: نسيج خارجي من الخارج + طلاء من الداخل
                                                                                                                                                                                                  // -Z هو الوجه الخارجي عندما normalSign > 0
                                                                                                                                                                                                      if (box.normalSign > 0) {
                                                                                                                                                                                                            return [neutralMaterial, neutralMaterial, neutralMaterial, neutralMaterial, interiorMaterial, exteriorMaterial];
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                      return [neutralMaterial, neutralMaterial, neutralMaterial, neutralMaterial, exteriorMaterial, interiorMaterial];
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                            }, [box, matProps, texture, repeatScale, isFence]);

                                                                                                                                                                                                                              return (
                                                                                                                                                                                                                                  <mesh position={box.position} rotation={[0, box.rotationY, 0]}>
                                                                                                                                                                                                                                        <boxGeometry args={box.size} />
                                                                                                                                                                                                                                              {materials.map((mat, i) => (
                                                                                                                                                                                                                                                      <primitive key={i} object={mat} attach={`material-${i}`} />
                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                </mesh>
                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                  };