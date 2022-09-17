import React, {FC} from 'react';

import {bem, cn} from './utils';
import {Modal, ModalProps} from './Modal';

import './Dialog.scss';

export type DialogProps = ModalProps & {
  size?: 'xs' | 's' | 'm' | 'l';
  onIconClose?: () => void;
};

const b = bem('Dialog');

export const Dialog: FC<DialogProps> = ({
  size = 'm',
  closeable = true,
  className,
  children,
  ...rest
}) => {
  return (
    <Modal
      closeable={closeable}
      className={cn(
        b('', {
          [`size-${size}`]: true,
        }),
        className,
      )}
      {...rest}
    >
      {children}
    </Modal>
  );
};
