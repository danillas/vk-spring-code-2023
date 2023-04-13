export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

export const cutArrayTail = <T>(arr: T[]) => {
  let lastIndex = arr.length - 1;

  while (lastIndex > 0 && arr[lastIndex] === arr[lastIndex - 1]) {
    lastIndex -= 1;
  }

  return arr.slice(0, lastIndex + 1);
};

export const arrify = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
