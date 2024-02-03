export const randomInteger = (min: number = 0, max: number = 1000000000): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}
