import React, {FC} from 'react';

import {bem, cn} from './utils';
// import {CloseIcon} from '../../Icons/CloseIcon';
import {Modal, ModalProps} from './Modal';

import './Dialog.scss';

export type DialogProps = ModalProps & {
  size?: 'xs' | 's' | 'm' | 'l';
  closeIcon?: boolean;
  onIconClose?: () => void;
};

const b = bem('Dialog');

export const Dialog: FC<DialogProps> = ({
  size = 'm',
  closeable = true,
  closeIcon = true,
  className,
  children,
  onIconClose,
  ...rest
}) => {
  return (
    <Modal closeable={closeable} className={cn(b(), className)} {...rest}>
      <div
        className={b('content', {
          [`size-${size}`]: true,
        })}
      >
        {/* {closeIcon && (
          <IconButton
            className={b('close')}
            icon={closeIconPrimary}
            onClick={onIconClose}
            disabled={!closeable}
            hoverebale
          />
        )} */}
        <section className={b('body')}>{children}</section>
      </div>
    </Modal>
  );
};
