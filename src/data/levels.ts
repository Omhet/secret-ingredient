const LEVELS_DATA = [
  {
    fileName: 'techno-120',
  },
];

const LEVELS = LEVELS_DATA.map(({ fileName }, index) => {
  return {
    number: index + 1,
    musicUrl: `music/${fileName}.mp3`,
    midiUrl: `midi/${fileName}.mid`,
    isOpen: true,
  };
});

export const getLevelsData = () => LEVELS;
export const getLevelData = (number: number) => LEVELS[number - 1];
