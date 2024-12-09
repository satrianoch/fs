import { useCallback, useRef, useState } from 'react';

interface LongPressOptions {
  onLongPress: () => void;
  onLongPressEnd?: () => void;
  ms?: number;
}

export const useLongPress = ({ onLongPress, onLongPressEnd, ms = 1000 }: LongPressOptions) => {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<number>();

  const start = useCallback(() => {
    setIsPressed(true);
    timerRef.current = window.setTimeout(() => {
      onLongPress();
    }, ms);
  }, [onLongPress, ms]);

  const stop = useCallback(() => {
    setIsPressed(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      onLongPressEnd?.();
    }
  }, [onLongPressEnd]);

  const handlers = {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };

  return { handlers, isPressed };
};