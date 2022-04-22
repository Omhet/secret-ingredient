import React, { FC } from 'react';
import s from './Rules.module.scss';

export type RulesProps = {};

export const Rules: FC = () => {
  return (
    <section id="rules" className={s.rulesSection}>
      <h2 className={s.rulesTitle}>How to play</h2>
      <div className={s.rulesContainer}>
        <div className={s.ruleItem}>
          <img className={s.image} src="/pics/japanCard.png" />
          <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
        </div>
        <div className={s.ruleItem}>
          <img className={s.image} src="/pics/mexicaCard.png" />
          <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
        </div>
        <div className={s.ruleItem}>
          <img className={s.image} src="/pics/russiaCard.png" />
          <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
        </div>
      </div>
      <div className={s.playSection}>
        <span>OK, clear, let&apos;s play!</span>
        <button className={s.levelsBtn}>See levels</button>
      </div>
    </section>
  );
};
