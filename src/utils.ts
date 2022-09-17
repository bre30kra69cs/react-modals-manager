import {ClassName, Mods} from './utils.types';

export const guardString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const guardEmptyString = (value: unknown): value is string => {
  return guardString(value) && !value;
};

export const guardNotEmptyString = (value: unknown): value is string => {
  return guardString(value) && !!value.trim();
};

export function last(value?: string): string | undefined;
export function last<T>(value?: T[]): T | undefined;
export function last(value?: any) {
  if (!value?.length) return;

  if (guardString(value)) {
    return value[value.length - 1];
  }

  if (Array.isArray(value)) {
    return value[value.length - 1];
  }
}

export const reverse = <T>(arr: T[]): T[] => {
  return [...arr].reverse();
};

export function invariant(value: unknown, message = 'Error'): asserts value {
  if (!value) {
    throw new Error(message);
  }
}

export const cn = (...classNames: ClassName[]) => {
  let acc = '';

  for (const className of classNames) {
    if (guardNotEmptyString(className)) {
      acc = acc + ' ' + className;
    }
  }

  return acc.trim();
};

const formatMod = (base: string, mod: string) => {
  return `${base}__${mod}`;
};

const formatBlock = (root: string, block: string) => {
  return `${root}--${block}`;
};

const formatMods = (base: string, mods: Mods) => {
  return [
    base,
    ...Object.keys(mods)
      .filter((mod) => !!mods[mod])
      .map((mod) => formatMod(base, mod)),
  ].join(' ');
};

export const bem = (root: string) => {
  return (block?: string, mods?: Mods) => {
    if (!block) {
      if (mods) {
        return formatMods(root, mods);
      }

      return root;
    }

    if (!mods) {
      return formatBlock(root, block);
    }

    return formatMods(formatBlock(root, block), mods);
  };
};
