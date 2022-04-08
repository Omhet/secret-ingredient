export class AudioManager {
  tracks: HTMLAudioElement[] = [];

  constructor(public urls: string[]) {}

  async loadLevelTrack(levelNumber: number): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const index = levelNumber - 1;

      const url = this.urls[index];

      if (!url) {
        reject(Error('No audio url for this level'));
      }

      // audio is already loading/loaded
      const track = this.tracks[index];
      if (track) {
        if (track.readyState === 4) {
          resolve(track);
        } else {
          track.addEventListener('canplaythrough', () => {
            resolve(track);
          });
        }
        return;
      }

      const audio = new Audio(url);
      this.tracks[index] = audio;
      audio.addEventListener('canplaythrough', () => {
        resolve(audio);
      });
    });
  }

  playLevelTrack(levelNumber: number) {
    const index = levelNumber - 1;

    const audio = this.tracks[index];

    if (audio) {
      audio.play();
    }
  }
}
