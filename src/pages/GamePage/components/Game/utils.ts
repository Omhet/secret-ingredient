export const getRandomArrayItem = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

const ANGLES = [225, 240, 270, 300, 315];
export const getRandomAngle = () => {
  return getRandomArrayItem(ANGLES);
};
