import { Markup } from '@app-types/music';
import { AudioManager } from './AudioManager';
import { ImagesManager, LevelImages, LevelImageUrls } from './ImagesManager';
import { MarkupManager } from './MarkupManager';

const LEVELS_DATA = [
  {
    name: 'Japan',
    unlockScore: 0,
    ingredientColors: ['#4B2507', '#C1956B'],
  },
  {
    name: 'Mexico',
    unlockScore: 0,
    ingredientColors: ['#FF4D00'],
  },
  {
    name: 'Russia',
    unlockScore: 0,
    ingredientColors: ['#FFF5E9', '#5C9E69'],
  },
  {
    name: 'Grandma',
    unlockScore: 0,
    ingredientColors: ['#C55350', '#DE9D81'],
  },
];

const LEVELS_FROM_STORAGE = JSON.parse(localStorage.getItem('levels') ?? '[]');

const LEVELS = LEVELS_DATA.map(({ name, unlockScore, ingredientColors }, index) => {
  const number = index + 1;
  const score = LEVELS_FROM_STORAGE[index]?.score ?? 0;

  const imgPath = `pics/levels/${number}`;
  const imgUrls: LevelImageUrls = {
    back: {
      horizontal: `${imgPath}/back_h.jpg`,
      vertical: `${imgPath}/back_v.jpg`,
    },
    food: [`${imgPath}/food/1.png`, `${imgPath}/food/2.png`, `${imgPath}/food/3.png`],
    master: `${imgPath}/master.png`,
    ingredient: `${imgPath}/ingredient.png`,
  };

  return {
    name,
    number,
    score,
    unlockScore,
    ingredientColors,
    musicUrl: `music/${number}.mp3`,
    midiUrl: `midi/${number}.mid`,
    imgUrls,
  };
});

type LevelType = {
  name: string;
  score: number;
  unlockScore: number;
  number: number;
  ingredientColors: string[];
  audio: HTMLAudioElement;
  markup: Markup;
  images: LevelImages;
};

class LevelDataManager {
  currentLevel = 1;
  levels: LevelType[] = [];

  constructor(
    public audioManager: AudioManager,
    public markupManager: MarkupManager,
    public imagesManager: ImagesManager
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.levels = [...LEVELS];
  }

  async loadLevelData(levelNumber: number) {
    this.currentLevel = levelNumber;

    const requests: [Promise<HTMLAudioElement>, Promise<Markup>, Promise<LevelImages>] = [
      this.audioManager.loadLevelTrack(levelNumber),
      this.markupManager.loadLevelMarkup(levelNumber),
      this.imagesManager.loadLevelImages(levelNumber),
    ];

    const [audio, markup, images] = await Promise.all(requests);
    const data = {
      audio,
      markup,
      images,
    };

    const index = levelNumber - 1;

    this.levels[levelNumber - 1] = {
      ...LEVELS[index],
      ...data,
    };

    return data;
  }

  playLevelMusic() {
    this.audioManager.playLevelTrack(this.currentLevel);
  }

  stopLevelMusic() {
    this.audioManager.stopLevelTrack(this.currentLevel);
  }

  getAllLevels() {
    return this.levels;
  }

  getCurrentLevelData() {
    return this.levels[this.currentLevel - 1];
  }
}

const musicUrls = LEVELS.map(({ musicUrl }) => musicUrl);
const audioManager = new AudioManager(musicUrls);

const midiUrls = LEVELS.map(({ midiUrl }) => midiUrl);
const markupManager = new MarkupManager(midiUrls);

const imageUrls = LEVELS.map(({ imgUrls }) => imgUrls);
const imagesManager = new ImagesManager(imageUrls);

export const levelDataManager = new LevelDataManager(audioManager, markupManager, imagesManager);
