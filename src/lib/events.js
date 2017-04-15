export const isMobileDevice = () => 'ontouchstart' in window

export const attachPointerDown = (eventHandler) => isMobileDevice() ? { onTouchStart: eventHandler } : { onMouseDown: eventHandler }

export const attachPointerUp = (eventHandler) => isMobileDevice() ? { onTouchEnd: eventHandler } : { onMouseUp: eventHandler }
