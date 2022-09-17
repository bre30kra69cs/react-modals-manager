export type Unlisten = () => void;

export type Listner<T> = (data: T) => void;

export type Emitter<T> = {
  unlisten: (listner: Listner<T>) => void;
  listen: (listner: Listner<T>) => Unlisten;
  emit: (data: T) => void;
  listners: () => Listner<T>[];
  clean: () => void;
};
