import { Emitter, EmitterConfigV3 } from '@pixi/particle-emitter';
import { ParticleContainer } from 'pixi.js';

const getConfig = (images: string[]): EmitterConfigV3 => ({
  lifetime: {
    min: 0.4,
    max: 0.7,
  },
  frequency: 0.001,
  emitterLifetime: 0.2,
  maxParticles: 200,
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
              value: 0,
            },
            {
              time: 0.5,
              value: 1,
            },
            {
              time: 1,
              value: 0,
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
              value: 500,
            },
          ],
        },
      },
    },
    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              time: 0,
              value: 0.1,
            },
            {
              time: 1,
              value: 1.2,
            },
          ],
        },
        minMult: 1,
      },
    },
    {
      type: 'rotation',
      config: {
        accel: 0,
        minSpeed: 0,
        maxSpeed: 200,
        minStart: 0,
        maxStart: 360,
      },
    },
    {
      type: 'textureRandom',
      config: {
        textures: images,
      },
    },
  ],
});

export function createParticlesEmitter(particleParent: ParticleContainer, images: string[]) {
  const emitter = new Emitter(particleParent, getConfig(images));

  return emitter;
}
