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
          levelNumber={levels[1].number}
          score={levels[1].score}
          isOpen={levels[1].isOpen}
          onClick={() => handlePlayClick(levels[1].number)}
        />
        <Level
          title="Somewhere in Eastern Europe"
          imgSrc="/pics/russiaCard.png"
          levelNumber={levels[2].number}
          score={levels[2].score}
          isOpen={levels[2].isOpen}
          onClick={() => handlePlayClick(levels[2].number)}
        />
        <Level
          title="The greatest secret"
          imgSrc="/pics/grandmaCard.png"
          levelNumber={levels[3].number}
          score={levels[3].score}
          isOpen={levels[3].isOpen}
          onClick={() => handlePlayClick(levels[3].number)}
        />
      </div>
    </section>
  );
};
