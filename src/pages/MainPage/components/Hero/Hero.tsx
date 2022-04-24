import React, { FC } from 'react';
import s from './Hero.module.scss';

export type HeroProps = {};

export const Hero: FC = () => {
  return (
    <section className={s.main}>
      <div className={s.heroContainer}>
        <span className={s.primaryText}>Feeling sad because your meal tastes raw?</span>
        <span className={s.secondaryText}>
          Let&apos;s find the secret ingredient to help you to become the greatest chef ever!
        </span>
        <div className={s.buttonsContainer}>
          <a href="#levels" className={s.accentBtn}>
            Play game
          </a>
          <a href="#story" className={s.secondaryBtn}>
            Read story
          </a>
        </div>
      </div>
      <div className={s.imgContainer}>
        <img className={s.image} src="pics/heroCat.png" />
      </div>
    </section>
  );
};
