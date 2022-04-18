import React, { FC } from 'react';
import s from './Rules.module.scss';

export type RulesProps = {};

export const Rules: FC = () => {
  return (
    <section className={s.rulesSection}>
      <div className={s.content}>
        <h2 className={s.rulesTitle}>How to play</h2>
        <div className={s.rulesContainer}>
          <div className={s.ruleItem}>
            <img className={s.image} src="/pics/cat.jpg" />
            <div className={s.descriptionContainer}>
              <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
            </div>
          </div>
          <div className={s.ruleItem}>
            <img className={s.image} src="/pics/cat.jpg" />
            <div className={s.descriptionContainer}>
              <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
            </div>
          </div>
          <div className={s.ruleItem}>
            <img className={s.image} src="/pics/cat.jpg" />
            <div className={s.descriptionContainer}>
              <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
            </div>
          </div>
          <div className={s.ruleItem}>
            <img className={s.image} src="/pics/cat.jpg" />
            <div className={s.descriptionContainer}>
              <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
            </div>
          </div>
          <div className={s.ruleItem}>
            <img className={s.image} src="/pics/cat.jpg" />
            <div className={s.descriptionContainer}>
              <span className={s.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
            </div>
          </div>
          <div className={s.ruleItem}>
            <span>
              OK, clear,
              <br /> let&apos;s play!
            </span>
            <button className={s.levelsBtn}>See levels</button>
          </div>
        </div>
      </div>
    </section>
  );
};
