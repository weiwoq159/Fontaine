export function formatResourceCount(value: number) {
  if (value < 1000) {
    return String(value);
  }

  return `${(value / 1000).toFixed(1)}k`;
}
