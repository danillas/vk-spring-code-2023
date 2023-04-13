/**
 * Определяет максимильную длину двух подмассивов, следующих
 * друг за другом в конце. Если таких нет, возвращает 0.
 */
export function getMaxTailRepeatLength(array: string[]): number {
  for (let tailLength = Math.floor(array.length / 2); tailLength > 0; tailLength--) {
    let subArrayMatch = true;

    for (let i = 0; i < tailLength && subArrayMatch; i++) {
      if (array[array.length - 1 - i] !== array[array.length - tailLength - 1 - i]) {
        subArrayMatch = false;
      }
    }

    if (subArrayMatch) {
      return tailLength;
    }
  }

  return 0;
}
