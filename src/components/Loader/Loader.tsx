import { levelDataManager } from '@lib/levels/LevelDataManager';
import React, { FC } from 'react';
import s from './Loader.module.scss';

export const Loader: FC = () => {
  const currentLevelFoodSrc = levelDataManager.getCurrentLevelData().images.food[0].src;
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader} style={{ backgroundImage: `url(${currentLevelFoodSrc})` }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
