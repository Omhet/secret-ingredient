import React, { FC } from 'react';
import s from './Rules.module.scss';

export type RulesProps = {};

export const Rules: FC = () => {
  return (
    <section className={s.rulesContainer}>
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
    </section>
  );
};
