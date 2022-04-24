import React, { FC } from 'react';
import s from './Loader.module.scss';

type LoaderProps = {
  levelNumber: number;
};

export const Loader: FC<LoaderProps> = ({ levelNumber }) => {
  const currentLevelFoodSrc = `/pics/levels/${levelNumber}/food/1.png`;

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
