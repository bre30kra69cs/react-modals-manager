import {useEffect} from 'react';

export const useStopScroll = (stopScroll = true) => {
  useEffect(() => {
    if (!stopScroll) {
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [stopScroll]);
};
