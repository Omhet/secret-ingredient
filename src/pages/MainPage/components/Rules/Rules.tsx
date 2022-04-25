import React, { FC } from 'react';
import s from './Rules.module.scss';

export type RulesProps = {};

export const Rules: FC = () => {
  return (
    <section id="rules" className={s.rulesSection}>
      <h2 className={s.rulesTitle}>How to play</h2>
      <div className={s.rulesContainer}>
        <img className={s.ruleItem} src="/pics/htp1.png" />
        <img className={s.ruleItem} src="/pics/htp2.png" />
        <img className={s.ruleItem} src="/pics/htp3.png" />
      </div>
    </section>
  );
};
