import { Emitter, EmitterConfigV3 } from '@pixi/particle-emitter';
import { ParticleContainer } from 'pixi.js';

const getConfig = (images: string[]): EmitterConfigV3 => ({
  lifetime: {
    min: 1,
    max: 2,
  },
  frequency: 0.008,
  emitterLifetime: 0.3,
  maxParticles: 500,
  addAtBack: true,
  pos: {
    x: 0,
    y: 0,
  },
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              time: 0,
              value: 1,
            },
            {
              time: 0.5,
              value: 0.5,
            },
            {
              time: 1,
              value: 0.2,
            },
          ],
        },
      },
    },
    {
      type: 'moveSpeed',
      config: {
        speed: {
          list: [
            {
              time: 0,
              value: 700,
            },
            {
              time: 1,
              value: 100,
            },
          ],
        },
      },
    },
    {
      type: 'scaleStatic',
      config: {
        min: 1,
        max: 2,
      },
    },
    {
      type: 'rotation',
      config: {
        accel: 0,
        minSpeed: 0,
        maxSpeed: 10,
        minStart: 180,
        maxStart: 360,
      },
    },
    {
      type: 'textureRandom',
      config: {
        textures: images,
      },
    },
    {
      type: 'spawnPoint',
      config: {},
    },
  ],
});

export function createParticlesEmitter(particleParent: ParticleContainer, images: string[]) {
  const emitter = new Emitter(particleParent, getConfig(images));

  return emitter;
}
