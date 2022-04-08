import { Markup } from '@app-types/music';
import { AudioManager } from './AudioManager';
import { MarkupManager } from './MarkupManager';

const LEVELS_DATA = [
  {
    fileName: 'techno-120',
  },
  {
    fileName: 'big-room',
  },
];

const LEVELS = LEVELS_DATA.map(({ fileName }, index) => {
  return {
    number: index + 1,
    musicUrl: `music/${fileName}.mp3`,
    midiUrl: `midi/${fileName}.mid`,
  };
});

class LevelDataManager {
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
    this.audioManager.playLevelTrack(levelNumber);
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
