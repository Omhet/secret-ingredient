import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Container, Sprite } from 'pixi.js';

export const pixiGame = (app: Application) => {
  const { images } = levelDataManager.getCurrentLevelData();

  document.addEventListener('click', handleTap);
  function handleTap() {
    console.log('tap');
  }

  const unitSize = app.screen.height / 4;

  const zone = new Container();
  zone.position.x = app.screen.width / 2;
  zone.position.y = app.screen.height;
  const zoneInner = Sprite.from('/pics/zone_inner.png');
  const zoneInnerSize = unitSize;
  zoneInner.width = zoneInnerSize;
  zoneInner.height = zoneInnerSize;
  zoneInner.anchor.set(0.5);
  const zoneOuter = Sprite.from('/pics/zone_outer.png');
  const zoneOuterSize = unitSize * 2;
  zoneOuter.width = zoneOuterSize;
  zoneOuter.height = zoneOuterSize;
  zoneOuter.anchor.set(0.5);
  zone.addChild(zoneOuter);
  zone.addChild(zoneInner);
  app.stage.addChild(zone);
  //   app.ticker.add((delta) => {});
};
