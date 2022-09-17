import React, {FC, useRef, ReactNode} from 'react';

import {bem} from './utils';
import {useClickOutside} from './useClickOutside';
import {useOnKey} from './useOnKey';

import './ModalContent.scss';

type ModalContentProps = {
  closeable?: boolean;
  children?: ReactNode;
  onOutsideClose?: () => void;
  onEscapeClose?: () => void;
};

const b = bem('ModalContent');

export const ModalContent: FC<ModalContentProps> = ({
  children,
  closeable = true,
  onOutsideClose,
  onEscapeClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside([ref], () => {
    if (closeable) {
      onOutsideClose?.();
    }
  });

  useOnKey(['Escape'], () => {
    if (closeable) {
      onEscapeClose?.();
    }
  });

  return (
    <div ref={ref} className={b()}>
      {children}
    </div>
  );
};
