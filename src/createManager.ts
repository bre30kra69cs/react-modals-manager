import {useState, useRef, useEffect} from 'react';

import {createEmitter} from './createEmitter';
import {createStore} from './createStore';
import {last, reverse, invariant, guardString} from './utils';
import {Manager, Modal, ModalState, OpenStrategy, CloseStrategy} from './createManager.types';
import {Rec} from './utils.types';

export const createManager = (): Manager => {
  const closable = createStore(true);
  const current = createStore<string[]>([]);
  const emitter = createEmitter<ModalState>();
  const mapper = new Map<string, Modal<Rec>>();

  const isMounted = (id: string) => {
    return mapper.has(id);
  };

  const createModal = <T extends Rec>(id: string, config: T): Modal<T> => {
    const modalId = () => {
      return id;
    };

    const unmount = () => {
      mapper.delete(id);
      close('always');
    };

    const open = (strategy: OpenStrategy = 'over', config?: T) => {
      if (isOpen()) {
        return;
      }

      if (strategy === 'over') {
        current.map((state) => [...state, id]);
      }

      if (strategy === 'replace') {
        const removeId = last(current.get());

        if (guardString(removeId)) {
          const modal = mapper.get(removeId);

          if (modal) {
            modal.close('always');
          }
        }

        current.map((state) => [...state, id]);
      }

      if (strategy === 'reset') {
        reverse(current.get()).forEach((removeId) => {
          const modal = mapper.get(removeId);

          if (modal) {
            modal.close('always');
          }
        });

        current.set([id]);
      }

      emitter.emit({
        id,
        show: true,
        config,
      });
    };

    const close = (strategy: CloseStrategy) => {
      if (!closable.get() && strategy === 'closable') {
        return;
      }

      if (!isOpen()) {
        return;
      }

      current.map((state) => {
        return state.filter((target) => target !== id);
      });

      emitter.emit({
        id,
        show: false,
      });
    };

    const isOpen = () => {
      return current.get().some((target) => target === id);
    };

    const useIsOpen = () => {
      const [state, setState] = useState(false);
      const ref = useRef(state);

      useEffect(() => {
        let isMounted = true;

        const unlisten = emitter.listen((modal) => {
          if (modal.id !== id) {
            return;
          }

          if (ref.current === modal.show) {
            return;
          }

          if (!isMounted) {
            return;
          }

          ref.current = modal.show;
          setState(modal.show);
        });

        return () => {
          isMounted = false;
          unlisten();
        };
      }, []);

      return state;
    };

    const isShadow = () => {
      return last(current.get()) !== id && isOpen();
    };

    const useIsShadow = () => {
      const [state, setState] = useState(isShadow());
      const ref = useRef(state);

      useEffect(() => {
        let isMounted = true;

        const unlisten = emitter.listen(() => {
          const shadow = isShadow();

          if (ref.current === shadow) {
            return;
          }

          if (!isMounted) {
            return;
          }

          ref.current = shadow;
          setState(shadow);
        });

        return () => {
          isMounted = false;
          unlisten();
        };
      }, []);

      return state;
    };

    const useConfig = () => {
      const [state, setState] = useState(false);
      const ref = useRef(state);
      const configRef = useRef<T>(config);

      useEffect(() => {
        let isMounted = true;

        const unlisten = emitter.listen((modal) => {
          if (modal.id !== id) {
            return;
          }

          if (ref.current === modal.show) {
            return;
          }

          if (!isMounted) {
            return;
          }

          ref.current = modal.show;

          configRef.current = {
            ...config,
            ...(modal.config as T),
          };

          setState(modal.show);
        });

        return () => {
          isMounted = false;
          unlisten();
        };
      }, []);

      return configRef.current;
    };

    return {
      modalId,
      unmount,
      open,
      close,
      isOpen,
      useIsOpen,
      useIsShadow,
      useConfig,
    };
  };

  const addModal = <T extends Rec>(id: string, config: T) => {
    invariant(!isMounted(id), `Modal ${id} is exist`);
    const modal = createModal(id, config);
    mapper.set(id, modal as Modal<Rec>);
    return modal;
  };

  return {
    addModal,
    setClosable: closable.set,
    listen: emitter.listen,
    unlisten: emitter.unlisten,
  };
};
