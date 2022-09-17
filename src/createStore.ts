import {createEmitter} from './createEmitter';
import {Store} from './createStore.types';

export const createStore = <T>(init: T): Store<T> => {
  let state = init;
  const emitter = createEmitter<T>();

  const set = (value: T) => {
    state = value;
    emitter.emit(state);
  };

  const get = () => {
    return state;
  };

  const map = (fn: (prev: T) => T) => {
    set(fn(get()));
  };

  const emit = () => {
    emitter.emit(get());
  };

  return {
    set,
    get,
    map,
    listen: emitter.listen,
    unlisten: emitter.unlisten,
    clean: emitter.clean,
    emit,
  };
};
