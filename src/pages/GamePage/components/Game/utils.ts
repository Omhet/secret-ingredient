const getRandomIndex = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

const getCycledArrayItem = (arr: any[], index: number) => {
  return arr[Math.min(Math.max(index, 0), arr.length - 1)];
};

export const getRandomArrayItem = <T>(arr: T[]) => {
  return arr[getRandomIndex(arr)];
};

export const createNotRepeatingRandomArrayItemFn = <T>(arr: T[]) => {
  let prevIndex: number | undefined;

  return () => {
    const randomIndex = getRandomIndex(arr);

    if (prevIndex === randomIndex) {
      const offset = Math.random() > 0.5 ? 1 : -1;
      return getCycledArrayItem(arr, randomIndex + offset);
    } else {
      prevIndex = randomIndex;
      return arr[randomIndex];
    }
  };
};

const ANGLES = [225, 240, 270, 300, 315];
export const getRandomAngle = () => {
  return getRandomArrayItem(ANGLES);
};
