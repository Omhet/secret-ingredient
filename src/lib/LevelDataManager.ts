import { Markup } from '@app-types/music';
import { AudioManager } from './AudioManager';
import { MarkupManager } from './MarkupManager';

const LEVELS_DATA = [
  {
    name: 'It just begins...',
  },
  {
    name: 'Getting hot',
  },
];

const LEVELS = LEVELS_DATA.map(({ name }, index) => {
  const number = index + 1;

  return {
    name,
    number,
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
