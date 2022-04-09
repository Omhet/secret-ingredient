import React, { FC } from 'react';
import s from './Hero.module.scss';

export type HeroProps = {};

export const Hero: FC = () => {
  return (
    <section className={s.main}>
      <div className={s.heroContainer}>
        <span className={s.primaryText}>Big text in two huge lines</span>
        <span className={s.secondaryText}>
          Smaller text about this game is a little bit longer Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Tenetur molestiae
        </span>
        <div className={s.buttonsContainer}>
          <button className={s.accentBtn}>Play game</button>
          <button className={s.secondaryBtn}>Read story</button>
        </div>
      </div>
      <div className={s.imgContainer}>
        <img className={s.image} src="pics/rocket.png" />
      </div>
    </section>
  );
};
