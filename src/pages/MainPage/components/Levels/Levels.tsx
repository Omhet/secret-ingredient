import { setCurrentLevelNumber, useLevels } from '@store/levels';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Level } from '../Level/Level';
import s from './Levels.module.scss';

const LevelTitles = ['Japanese meditation', 'Wild wild west', 'Somewhere in Eastern Europe', 'The greatest secret'];

const LevelImages = ['/pics/japanCard.png', '/pics/mexicaCard.png', '/pics/russiaCard.png', '/pics/grandmaCard.png'];

export const Levels: FC = () => {
  const { levels } = useLevels();
  const history = useHistory();

  const handlePlayClick = (levelNumber: number) => {
    setCurrentLevelNumber(levelNumber);
    history.push(`/game?level=${levelNumber}`);
  };

  return (
    <section id="levels" className={s.sectionContainer}>
      <h2 className={s.levelsTitle}>Levels</h2>
      <div className={s.levelsContainer}>
        {levels.map((level, index) => (
          <Level
            key={level.number}
            title={LevelTitles[index]}
            imgSrc={LevelImages[index]}
            score={level.score}
            maxLevelScore={level.maxScore}
            isOpen={level.isOpen}
            onClick={() => handlePlayClick(level.number)}
          />
        ))}
      </div>
    </section>
  );
};
