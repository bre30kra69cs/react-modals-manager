import {Listner, Unlisten} from './createEmitter.types';

export type Store<T> = {
  set: (value: T) => void;
  get: () => T;
  map: (fn: (prev: T) => T) => void;
  unlisten: (listner: Listner<T>) => void;
  listen: (listner: Listner<T>) => Unlisten;
  clean: () => void;
  emit: () => void;
};
