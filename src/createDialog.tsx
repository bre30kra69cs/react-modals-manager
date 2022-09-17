import React, {memo, FC} from 'react';

import {Dialog, DialogProps} from './Dialog';
import {Manager} from './createManager.types';
import {Rec} from './utils.types';

export const createDialog = (manager: Manager) => {
  return <T extends Rec = Rec<never>>(id: string, config: T & DialogProps) => {
    const modal = manager.addModal(id, config);

    const dialogify = <P extends Rec = Rec<never>>(Content: FC<P & T & DialogProps>): FC<P> => {
      return memo<P>((props) => {
        const isOpen = modal.useIsOpen();
        const isShadow = modal.useIsShadow();
        const config = modal.useConfig();
        const {closeable, onOutsideClose, onEscapeClose, onIconClose, ...rest} = config;

        if (!isOpen) {
          return null;
        }

        const $closeable = !isShadow && closeable;

        const $onOutsideClose = () => {
          modal.close('always');
          onOutsideClose?.();
        };

        const $onEscapeClose = () => {
          modal.close('closable');
          onEscapeClose?.();
        };

        const $onIconClose = () => {
          modal.close('always');
          onIconClose?.();
        };

        const dialogProps = {
          ...rest,
          ...props,
          closeable: $closeable,
          onOutsideClose: $onOutsideClose,
          onEscapeClose: $onEscapeClose,
          onIconClose: $onIconClose,
        } as P & T & DialogProps;

        return (
          <Dialog {...dialogProps}>
            <Content {...dialogProps} />
          </Dialog>
        );
      });
    };

    return {
      modal,
      dialogify,
    };
  };
};
