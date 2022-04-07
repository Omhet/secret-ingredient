const ANGLES = [225, 270, 315];
export const getRandomAngle = () => {
  const index = Math.floor(Math.random() * ANGLES.length);
  return ANGLES[index];
};
