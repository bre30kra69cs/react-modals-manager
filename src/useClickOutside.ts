import {useEffect, RefObject} from 'react';

type Config = {
  capture?: boolean;
};

export const useClickOutside = (
  refs: RefObject<Element>[],
  onOutside: () => void,
  config?: Config,
) => {
  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (!refs.length) {
        return;
      }

      const target = event.target as Node;
      const isOutside = refs.every((ref) => !ref.current?.contains(target));

      if (isOutside) {
        onOutside();
      }
    };

    document.addEventListener('click', listner, config);

    return () => {
      document.removeEventListener('click', listner, config);
    };
  }, [...refs, onOutside]);
};
