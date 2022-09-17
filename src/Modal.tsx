import React, {FC, ReactNode} from 'react';

import {bem, cn} from './utils';
import {useStopScroll} from './useStopScroll';
import {ModalBackdrop, ModalBackdropState} from './ModalBackdrop';
import {ModalContent} from './ModalContent';

import './Modal.scss';

export type ModalProps = {
  backdrop?: ModalBackdropState | 'none';
  closeable?: boolean;
  stopScroll?: boolean;
  className?: string;
  children?: ReactNode;
  onOutsideClose?: () => void;
  onEscapeClose?: () => void;
};

const b = bem('Modal');

export const Modal: FC<ModalProps> = ({
  backdrop = 'm',
  children,
  closeable = true,
  stopScroll = true,
  className,
  onOutsideClose,
  onEscapeClose,
}) => {
  useStopScroll(stopScroll);

  return (
    <dialog className={cn(b(), className)}>
      {backdrop !== 'none' && <ModalBackdrop state={backdrop} />}
      <ModalContent
        onOutsideClose={onOutsideClose}
        onEscapeClose={onEscapeClose}
        closeable={closeable}
      >
        {children}
      </ModalContent>
    </dialog>
  );
};
