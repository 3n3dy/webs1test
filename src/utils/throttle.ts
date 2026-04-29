export const throttle = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  delay: number,
) => {
  let lastCall = 0;

  return (...args: TArgs) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
