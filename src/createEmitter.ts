import {Emitter, Listner} from './createEmitter.types';

export const createEmitter = <T>(): Emitter<T> => {
  let state: Listner<T>[] = [];

  const isExist = (listner: Listner<T>) => {
    return state.find((target) => {
      return target === listner;
    });
  };

  const unlisten = (listner: Listner<T>) => {
    if (!isExist(listner)) {
      return;
    }

    state = state.filter((item) => {
      return item !== listner;
    });
  };

  const listen = (listner: Listner<T>) => {
    if (!isExist(listner)) {
      state.push(listner);
    }

    return () => {
      unlisten(listner);
    };
  };

  const emit = (data: T) => {
    state.forEach((listner) => {
      return listner(data);
    });
  };

  const listners = () => {
    return state;
  };

  const clean = () => {
    state = [];
  };

  return {
    unlisten,
    listen,
    emit,
    listners,
    clean,
  };
};
