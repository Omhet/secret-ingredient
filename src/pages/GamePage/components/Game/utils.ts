export const getRandomArrayItem = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const ANGLES = [225, 270, 315];
export const getRandomAngle = () => {
  return getRandomArrayItem(ANGLES);
};
