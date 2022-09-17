import {Listner, Unlisten} from './createEmitter.types';
import {Rec} from './utils.types';

export type OpenStrategy = 'over' | 'replace' | 'reset';

export type CloseStrategy = 'always' | 'closable';

export type Modal<T extends Rec> = {
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

export type ModalState = {
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

export type Manager = {
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
