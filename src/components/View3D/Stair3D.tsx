import React from 'react';
import type { Stair, StairElement } from '../../core/types';

// ============================================================
// ✅ سلّم قديم (Stair) — سلسلة من الدرجات
// ============================================================
interface StairProps {
  stair: Stair;
    floorHeight: number;
    }

    export const Stair3D: React.FC<StairProps> = ({ stair, floorHeight }) => {
      const stepCount = Math.max(2, Math.floor((stair.totalLength - stair.landingLength) / stair.treadDepth));
        const stepRise = floorHeight / (stepCount + 1);

          const cx = stair.center.x;
            const cz = stair.center.y;
              const rotation = stair.rotation || 0;

                return (
                    <group position={[cx, 0, cz]} rotation={[0, -rotation, 0]}>
                          {Array.from({ length: stepCount }).map((_, i) => {
                                  const y = stepRise * (i + 1);
                                          const z = -(stair.totalLength / 2) + stair.treadDepth * (i + 0.5);
                                                  return (
                                                            <mesh key={i} position={[0, y - stepRise / 2, z]}>
                                                                        <boxGeometry args={[stair.width, stepRise, stair.treadDepth]} />
                                                                                    <meshStandardMaterial color="#c8c8c8" roughness={0.8} />
                                                                                              </mesh>
                                                                                                      );
                                                                                                            })}
                                                                                                                  {/* البسطة العلوية */}
                                                                                                                        {stair.landingLength > 0 && (
                                                                                                                                <mesh position={[0, floorHeight - stepRise / 2, stair.totalLength / 2 - stair.landingLength / 2]}>
                                                                                                                                          <boxGeometry args={[stair.width, stepRise, stair.landingLength]} />
                                                                                                                                                    <meshStandardMaterial color="#c8c8c8" roughness={0.8} />
                                                                                                                                                            </mesh>
                                                                                                                                                                  )}
                                                                                                                                                                      </group>
                                                                                                                                                                        );
                                                                                                                                                                        };

                                                                                                                                                                        // ============================================================
                                                                                                                                                                        // ✅ عنصر سلّم جديد (StairElement) — سحبة أو بسطة
                                                                                                                                                                        // ============================================================
                                                                                                                                                                        interface ElementProps {
                                                                                                                                                                          element: StairElement;
                                                                                                                                                                          }

                                                                                                                                                                          export const StairElement3D: React.FC<ElementProps> = ({ element }) => {
                                                                                                                                                                            const cx = element.position.x;
                                                                                                                                                                              const cz = element.position.y;
                                                                                                                                                                                const rotation = element.rotation || 0;

                                                                                                                                                                                  if (element.type === 'landing') {
                                                                                                                                                                                      // ✅ بسطة: صندوق مسطّح
                                                                                                                                                                                          return (
                                                                                                                                                                                                <mesh
                                                                                                                                                                                                        position={[cx, 0.1, cz]}
                                                                                                                                                                                                                rotation={[0, -rotation, 0]}
                                                                                                                                                                                                                      >
                                                                                                                                                                                                                              <boxGeometry args={[element.width, 0.2, element.length]} />
                                                                                                                                                                                                                                      <meshStandardMaterial color="#d0d0d0" roughness={0.85} />
                                                                                                                                                                                                                                            </mesh>
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                    // ✅ سحبة: سلسلة من الدرجات
                                                                                                                                                                                                                                                      const treadDepth = element.treadDepth ?? 0.27;
                                                                                                                                                                                                                                                        const stepRise = element.riserHeight ?? 0.17;
                                                                                                                                                                                                                                                          const count = Math.max(2, Math.floor(element.length / treadDepth));

                                                                                                                                                                                                                                                            return (
                                                                                                                                                                                                                                                                <group position={[cx, 0, cz]} rotation={[0, -rotation, 0]}>
                                                                                                                                                                                                                                                                      {Array.from({ length: count }).map((_, i) => {
                                                                                                                                                                                                                                                                              const y = stepRise * (i + 1);
                                                                                                                                                                                                                                                                                      const z = -(element.length / 2) + treadDepth * (i + 0.5);
                                                                                                                                                                                                                                                                                              return (
                                                                                                                                                                                                                                                                                                        <mesh key={i} position={[0, y - stepRise / 2, z]}>
                                                                                                                                                                                                                                                                                                                    <boxGeometry args={[element.width, stepRise, treadDepth]} />
                                                                                                                                                                                                                                                                                                                                <meshStandardMaterial color="#c8c8c8" roughness={0.8} />
                                                                                                                                                                                                                                                                                                                                          </mesh>
                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                        })}
                                                                                                                                                                                                                                                                                                                                                            </group>
                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                              };