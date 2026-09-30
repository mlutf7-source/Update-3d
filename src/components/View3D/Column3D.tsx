import React from 'react';
import type { Column } from '../../core/types';

interface Props {
  column: Column;
    height: number;
      color?: string;
        roughness?: number;
          metalness?: number;
          }

          export const Column3D: React.FC<Props> = ({
            column,
              height,
                color = '#9a9a9a',
                  roughness = 0.6,
                    metalness = 0.05,
                    }) => {
                      const cx = column.position.x;
                        const cz = column.position.y;
                          const isCircle = column.columnShape === 'circle';

                            if (isCircle) {
                                // ✅ عمود دائري
                                    const radius = column.width / 2;
                                        return (
                                              <mesh position={[cx, height / 2, cz]}>
                                                      <cylinderGeometry args={[radius, radius, height, 32]} />
                                                              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
                                                                    </mesh>
                                                                        );
                                                                          }

                                                                            // ✅ عمود مستطيل
                                                                              return (
                                                                                  <mesh
                                                                                        position={[cx, height / 2, cz]}
                                                                                              rotation={[0, -(column.rotation || 0), 0]}
                                                                                                  >
                                                                                                        <boxGeometry args={[column.width, height, column.length]} />
                                                                                                              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
                                                                                                                  </mesh>
                                                                                                                    );
                                                                                                                    };