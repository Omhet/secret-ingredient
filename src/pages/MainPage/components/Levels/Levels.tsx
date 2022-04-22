import { startLevel, useLevels } from '@store/levels';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Level } from '../Level/Level';
import s from './Levels.module.scss';

export type LevelsProps = {};

export const Levels: FC<LevelsProps> = ({}) => {
  const { levels } = useLevels();
  const history = useHistory();

  const handlePlayClick = (levelNumber: number) => {
    startLevel(levelNumber);
    history.push('/game');
  };

  return (
    <section id="levels" className={s.sectionContainer}>
      <h2 className={s.levelsTitle}>Levels</h2>
      <div className={s.levelsContainer}>
        <Level
          title="Japanese meditation"
          imgSrc="/pics/japanCard.png"
          levelNumber={levels[0].number}
          score={levels[0].score}
          isOpen={levels[0].isOpen}
          onClick={() => handlePlayClick(levels[0].number)}
        />
        <Level
          title="Wild wild west"
          imgSrc="/pics/mexicaCard.png"
          levelNumber={2}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(2)}
        />
        <Level
          title="Somewhere in Eastern Europe"
          imgSrc="/pics/russiaCard.png"
          levelNumber={3}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(3)}
        />
        <Level
          title="The greatest secret"
          imgSrc="/pics/grandmaCard.png"
          levelNumber={4}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(4)}
        />
      </div>
    </section>
  );
};
