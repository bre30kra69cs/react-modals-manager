import {useEffect} from 'react';

export const useOnKey = (keys: string[], onKey: () => void) => {
  useEffect(() => {
    const listner = (event: KeyboardEvent) => {
      const isPressed = keys.includes(event.key);

      if (isPressed) {
        onKey();
      }
    };

    document.addEventListener('keydown', listner);

    return () => {
      document.removeEventListener('keydown', listner);
    };
  }, [...keys, onKey]);
};
