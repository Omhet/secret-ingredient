import party, { Emitter, sources } from 'party-js';

const heart = () => {
  const heartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  heartPath.setAttribute(
    'd',
    'M316.722,29.761c66.852,0,121.053,54.202,121.053,121.041c0,110.478-218.893,257.212-218.893,257.212S0,266.569,0,150.801 C0,67.584,54.202,29.761,121.041,29.761c40.262,0,75.827,19.745,97.841,49.976C240.899,49.506,276.47,29.761,316.722,29.761z'
  );

  const heartShape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  heartShape.setAttribute('viewBox', '0 0 512 512');
  heartShape.setAttribute('height', '20');
  heartShape.setAttribute('width', '20');
  heartShape.appendChild(heartPath);
};

const circle = () => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  path.setAttribute('cx', '1');
  path.setAttribute('cy', '1');

  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  shape.setAttribute('viewBox', '0 0 512 512');
  shape.setAttribute('height', '20');
  shape.setAttribute('width', '20');
  shape.appendChild(path);
};

type Options = {
  colors: string[];
  size?: number;
  count?: number;
};

export function ingredientBlast(source: sources.DynamicSourceType, { colors, count = 15, size = 1 }: Options): Emitter {
  const emitter = party.scene.current.createEmitter({
    emitterOptions: {
      loops: 1,
      useGravity: false,
      modules: [
        new party.ModuleBuilder()
          .drive('size')
          .by(new party.NumericSpline({ time: 0, value: 0 }, { time: 0.1, value: size }, { time: 1, value: 0 }))
          .through('relativeLifetime')
          .build(),
      ],
    },
    emissionOptions: {
      rate: 0,
      bursts: [{ time: 0, count }],
      angle: party.variation.range(0, 360),
      initialSpeed: 100,
      initialLifetime: 1,
      initialSize: size,
      sourceSampler: party.sources.dynamicSource(source),
      initialColor: colors.map((color) => party.Color.fromHex(color)),
    },
    rendererOptions: {
      shapeFactory: 'circle',
      applyLighting: undefined,
    },
  });
  party.resolveShapeFactory;

  return emitter;
}
