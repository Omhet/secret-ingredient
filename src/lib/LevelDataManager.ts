import { Markup } from '@app-types/music';
import { AudioManager } from './AudioManager';
import { MarkupManager } from './MarkupManager';

const LEVELS_DATA = [
  {
    name: 'It just begins...',
    unlockScore: 0,
  },
  {
    name: 'Getting hot',
    unlockScore: 1,
  },
];

const LEVELS_FROM_STORAGE = JSON.parse(localStorage.getItem('levels') ?? '[]');

const LEVELS = LEVELS_DATA.map(({ name, unlockScore }, index) => {
  const number = index + 1;
  const score = LEVELS_FROM_STORAGE[index]?.score ?? 0;

  return {
    name,
    number,
    score,
    unlockScore,
    musicUrl: `music/${number}.mp3`,
    midiUrl: `midi/${number}.mid`,
  };
});

class LevelDataManager {
  currentLevel = 1;

  constructor(public audioManager: AudioManager, public markupManager: MarkupManager) {}

  async loadLevelData(levelNumber: number) {
    const requests: [Promise<HTMLAudioElement>, Promise<Markup>] = [
      this.audioManager.loadLevelTrack(levelNumber),
      this.markupManager.loadLevelMarkup(levelNumber),
    ];

    const [audio, markup] = await Promise.all(requests);

    return {
      audio,
      markup,
    };
  }

  playLevelMusic(levelNumber: number) {
    this.currentLevel = levelNumber;
    this.audioManager.playLevelTrack(levelNumber);
  }

  stopLevelMusic() {
    this.audioManager.stopLevelTrack(this.currentLevel);
  }

  getAllLevels() {
    return LEVELS;
  }
}

const musicUrls = LEVELS.map(({ musicUrl }) => musicUrl);
const audioManager = new AudioManager(musicUrls);

const midiUrls = LEVELS.map(({ midiUrl }) => midiUrl);
const markupManager = new MarkupManager(midiUrls);

export const levelDataManager = new LevelDataManager(audioManager, markupManager);
