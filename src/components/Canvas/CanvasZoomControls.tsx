import React from 'react';
import { FloorControls } from './FloorControls';

interface Props {
  onZoomIn: () => void;
    onZoomOut: () => void;
      onReset: () => void;
        /** ✅ عند false → تُخفى أزرار التكبير فقط (تبقى أزرار الأدوار) */
          showZoom?: boolean;
            // ✅ الأدوار
              activeFloor?: number;
                maxFloor?: number;
                  showPreviousFloor?: boolean;
                    onSetActiveFloor?: (floor: number) => void;
                      onAddFloor?: () => void;
                        onCopyFloor?: () => void;
                          onDeleteFloor?: (floor: number) => void;
                            onTogglePreviousFloor?: () => void;
                            // ✅ ارتفاع الدور
                            floorHeights?: number[];
                            onSetFloorHeight?: (floor: number, height: number) => void;
                            }

                            export const CanvasZoomControls: React.FC<Props> = React.memo(({
                              onZoomIn,
                                onZoomOut,
                                  onReset,
                                    showZoom = true,
                                      activeFloor = 0,
                                        maxFloor = 0,
                                          showPreviousFloor = false,
                                            onSetActiveFloor,
                                              onAddFloor,
                                                onCopyFloor,
                                                  onDeleteFloor,
                                                    onTogglePreviousFloor,
                                                    floorHeights = [3.0],
                                                    onSetFloorHeight,
                                                    }) => {
                                                      const zoomBtnStyle: React.CSSProperties = {
                                                          padding: '8px 14px',
                                                              fontSize: 18,
                                                                  borderRadius: 6,
                                                                      border: '1px solid #ccc',
                                                                          background: '#fff',
                                                                              cursor: 'pointer',
                                                                                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                                                                    };

                                                                                      const hasFloorProps =
                                                                                          onSetActiveFloor &&
                                                                                              onAddFloor &&
                                                                                                  onCopyFloor &&
                                                                                                      onDeleteFloor &&
                                                                                                          onTogglePreviousFloor;

                                                                                                            return (
                                                                                                                <>
                                                                                                                      {/* ✅ أزرار التكبير (يسار) — تظهر فقط في وضع العرض */}
                                                                                                                            {showZoom && (
                                                                                                                                    <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 6, zIndex: 10 }}>
                                                                                                                                              <button onClick={onZoomIn} style={zoomBtnStyle}>+</button>
                                                                                                                                                        <button onClick={onZoomOut} style={zoomBtnStyle}>−</button>
                                                                                                                                                                  <button onClick={onReset} style={zoomBtnStyle}>↺</button>
                                                                                                                                                                          </div>
                                                                                                                                                                                )}

                                                                                                                                                                                      {/* ✅ أزرار الأدوار (يمين) — دائماً ظاهرة */}
                                                                                                                                                                                            {hasFloorProps && (
                                                                                                                                                                                                    <div
                                                                                                                                                                                                              style={{ position: 'absolute', bottom: 70, right: 10, zIndex: 10 }}
                                                                                                                                                                                                                        onPointerDown={e => e.stopPropagation()}
                                                                                                                                                                                                                                  onPointerUp={e => e.stopPropagation()}
                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                    <FloorControls
                                                                                                                                                                                                                                                                activeFloor={activeFloor}
                                                                                                                                                                                                                                                                            maxFloor={maxFloor}
                                                                                                                                                                                                                                                                                        showPreviousFloor={showPreviousFloor}
                                                                                                                                                                                                                                                                                                    onSetActiveFloor={onSetActiveFloor!}
                                                                                                                                                                                                                                                                                                                onAddFloor={onAddFloor!}
                                                                                                                                                                                                                                                                                                                            onCopyFloor={onCopyFloor!}
                                                                                                                                                                                                                                                                                                                                        onDeleteFloor={onDeleteFloor!}
                                                                                                                                                                                                                                                                                                                                                    onTogglePreviousFloor={onTogglePreviousFloor!}
                                                       floorHeights={floorHeights}
                                                         onSetFloorHeight={onSetFloorHeight!}
                                                         />                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                                                </>
                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                  });