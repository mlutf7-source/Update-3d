import React from 'react';
import type { Wall } from '../../core/types';

interface Props {
  walls: Wall[];
    /** منسوب القاع (أسفل السقف) */
      yBottom: number;
        thickness?: number;
          slabColor?: string;
          }

          // ✅ ثوابت الرخام المحيطي
          const MARBLE_COLOR = '#f5f0e8';
          const MARBLE_JOINT_SPACING = 0.20;   // 20 سم
          const MARBLE_JOINT_WIDTH = 0.01;     // 1 سم (الوصلات)
          const MARBLE_PROTRUSION = 0.03;      // بروز الرخام خارج السقف

          export const Slab3D: React.FC<Props> = ({
            walls,
              yBottom,
                thickness = 0.30,
                  slabColor = '#d9d4c8',
                  }) => {
                    if (walls.length === 0) return null;

                      // ✅ حساب الحدود الخارجية
                        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                          walls.forEach(w => {
                              minX = Math.min(minX, w.start.x, w.end.x);
                                  maxX = Math.max(maxX, w.start.x, w.end.x);
                                      minY = Math.min(minY, w.start.y, w.end.y);
                                          maxY = Math.max(maxY, w.start.y, w.end.y);
                                            });

                                              // ✅ إضافة نصف سماكة الجدار من كل جانب
                                                const maxThickness = Math.max(...walls.map(w => w.thickness), 0.3);
                                                  const margin = maxThickness / 2;

                                                    const width = maxX - minX + margin * 2;
                                                      const length = maxY - minY + margin * 2;
                                                        const cx = (minX + maxX) / 2;
                                                          const cz = (minY + maxY) / 2;

                                                            // ✅ توليد مواقع شرائح الرخام مع الوصلات
                                                              const buildSegments = (sideLength: number) => {
                                                                  const count = Math.max(1, Math.round(sideLength / MARBLE_JOINT_SPACING));
                                                                      const segLen = (sideLength - MARBLE_JOINT_WIDTH * (count - 1)) / count;
                                                                          const segments: { center: number; len: number }[] = [];
                                                                              for (let i = 0; i < count; i++) {
                                                                                    const center = -sideLength / 2 + i * (segLen + MARBLE_JOINT_WIDTH) + segLen / 2;
                                                                                          segments.push({ center, len: segLen });
                                                                                              }
                                                                                                  return segments;
                                                                                                    };

                                                                                                      const xSegments = buildSegments(width);
                                                                                                        const zSegments = buildSegments(length);

                                                                                                          const marbleMat = { color: MARBLE_COLOR, roughness: 0.15, metalness: 0.2 };

                                                                                                            return (
                                                                                                                <group position={[cx, yBottom, cz]}>
                                                                                                                      {/* ✅ جسم السقف الأساسي */}
                                                                                                                            <mesh position={[0, thickness / 2, 0]}>
                                                                                                                                    <boxGeometry args={[width, thickness, length]} />
                                                                                                                                            <meshStandardMaterial color={slabColor} roughness={0.85} metalness={0.05} />
                                                                                                                                                  </mesh>

                                                                                                                                                        {/* ✅ الرخام الأمامي (+Z) */}
                                                                                                                                                              {xSegments.map((seg, i) => (
                                                                                                                                                                      <mesh key={`f-${i}`} position={[seg.center, thickness / 2, length / 2 + MARBLE_PROTRUSION / 2]}>
                                                                                                                                                                                <boxGeometry args={[seg.len, thickness, MARBLE_PROTRUSION]} />
                                                                                                                                                                                          <meshStandardMaterial {...marbleMat} />
                                                                                                                                                                                                  </mesh>
                                                                                                                                                                                                        ))}

                                                                                                                                                                                                              {/* ✅ الرخام الخلفي (-Z) */}
                                                                                                                                                                                                                    {xSegments.map((seg, i) => (
                                                                                                                                                                                                                            <mesh key={`b-${i}`} position={[seg.center, thickness / 2, -length / 2 - MARBLE_PROTRUSION / 2]}>
                                                                                                                                                                                                                                      <boxGeometry args={[seg.len, thickness, MARBLE_PROTRUSION]} />
                                                                                                                                                                                                                                                <meshStandardMaterial {...marbleMat} />
                                                                                                                                                                                                                                                        </mesh>
                                                                                                                                                                                                                                                              ))}

                                                                                                                                                                                                                                                                    {/* ✅ الرخام الأيسر (-X) */}
                                                                                                                                                                                                                                                                          {zSegments.map((seg, i) => (
                                                                                                                                                                                                                                                                                  <mesh key={`l-${i}`} position={[-width / 2 - MARBLE_PROTRUSION / 2, thickness / 2, seg.center]}>
                                                                                                                                                                                                                                                                                            <boxGeometry args={[MARBLE_PROTRUSION, thickness, seg.len]} />
                                                                                                                                                                                                                                                                                                      <meshStandardMaterial {...marbleMat} />
                                                                                                                                                                                                                                                                                                              </mesh>
                                                                                                                                                                                                                                                                                                                    ))}

                                                                                                                                                                                                                                                                                                                          {/* ✅ الرخام الأيمن (+X) */}
                                                                                                                                                                                                                                                                                                                                {zSegments.map((seg, i) => (
                                                                                                                                                                                                                                                                                                                                        <mesh key={`r-${i}`} position={[width / 2 + MARBLE_PROTRUSION / 2, thickness / 2, seg.center]}>
                                                                                                                                                                                                                                                                                                                                                  <boxGeometry args={[MARBLE_PROTRUSION, thickness, seg.len]} />
                                                                                                                                                                                                                                                                                                                                                            <meshStandardMaterial {...marbleMat} />
                                                                                                                                                                                                                                                                                                                                                                    </mesh>
                                                                                                                                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                                                                                                                              </group>
                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                };