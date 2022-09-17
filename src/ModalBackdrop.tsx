import React, {FC} from 'react';

import {bem} from './utils';

import './ModalBackdrop.scss';

export type ModalBackdropState = 's' | 'm' | 'l';

type ModalBackdropProps = {
  state: ModalBackdropState;
};

const b = bem('ModalBackdrop');

export const ModalBackdrop: FC<ModalBackdropProps> = ({state}) => {
  return (
    <section
      className={b('', {
        [`state-${state}`]: true,
      })}
    />
  );
};
