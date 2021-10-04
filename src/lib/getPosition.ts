export const getPosition = (index: number, from: number, to: number) => {
  if (index === from) return to;
  if (from < index && index <= to) return index - 1;
  if (from > index && index >= to) return index + 1;
  return index;
};
