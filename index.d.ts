import {ReactNode, FC} from 'react';

export declare type Unlisten = () => void;

export declare type Listner<T> = (data: T) => void;

export declare type Rec<T = unknown> = Record<string, T>;

export declare type OpenStrategy = 'over' | 'replace' | 'reset';

export declare type CloseStrategy = 'always' | 'closable';

export declare type Modal<T extends Rec> = {
  /**
   * Get modal id
   */
  modalId: () => string;
  /**
   * Remove modal from manager
   */
  unmount: () => void;
  /**
   * Open modal
   */
  open: (strategy?: OpenStrategy, config?: T) => void;
  /**
   * Close modal
   */
  close: (strategy: CloseStrategy) => void;
  /**
   * Get modal visability state
   */
  isOpen: () => boolean;
  /**
   * Modal visability state hook
   */
  useIsOpen: () => boolean;
  /**
   * Modal shadow state hook
   */
  useIsShadow: () => boolean;
  /**
   * Modal config
   */
  useConfig: () => T;
};

export declare type ModalState = {
  /**
   * Modal id
   */
  id: string;
  /**
   * Modal visability state
   */
  show: boolean;
  /**
   * Modal config
   */
  config?: Rec;
};

export declare type Manager = {
  /**
   * Create modal and add to manager
   */
  addModal: <T extends Rec>(id: string, config: T) => Modal<T>;
  /**
   * Listen modals visability state change
   */
  listen: (listner: Listner<ModalState>) => Unlisten;
  /**
   * Unlisten modals visability state change
   */
  unlisten: (listner: Listner<ModalState>) => void;
  /**
   * Change closable status
   */
  setClosable: (closable: boolean) => void;
};

export declare const createManager: () => Manager;

export declare type ModalBackdropState = 's' | 'm' | 'l';

export declare type ModalProps = {
  backdrop?: ModalBackdropState | 'none';
  closeable?: boolean;
  stopScroll?: boolean;
  className?: string;
  children?: ReactNode;
  onOutsideClose?: () => void;
  onEscapeClose?: () => void;
};

export declare type DialogProps = ModalProps & {
  size?: 'xs' | 's' | 'm' | 'l';
  closeIcon?: boolean;
  onIconClose?: () => void;
};

export declare const createDialog: (manager: Manager) => <T extends Rec<unknown> = Rec<never>>(
  id: string,
  config: T & DialogProps,
) => {
  modal: Modal<T & ModalProps & DialogProps>;
  dialogify: <P extends Rec<unknown> = Rec<never>>(
    Content: FC<P & T & ModalProps & DialogProps>,
  ) => FC<P>;
};
