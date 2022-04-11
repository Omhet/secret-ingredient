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
    <section className={s.levelsContainer}>
      <div className={s.levelColumn}>
        <Level
          title={`Level ${levels[0].number}`}
          imgSrc="/pics/cat.jpg"
          levelNumber={levels[0].number}
          score={levels[0].score}
          isOpen={levels[0].isOpen}
          onClick={() => handlePlayClick(levels[0].number)}
        />
      </div>
      <div className={s.levelColumn}>
        <Level
          title={`Level ${levels[1].number}`}
          imgSrc="/pics/cat.jpg"
          levelNumber={levels[1].number}
          score={levels[1].score}
          isOpen={levels[1].isOpen}
          onClick={() => handlePlayClick(levels[1].number)}
        />
        <Level isEmptyCard={true} />
      </div>
      <div className={s.levelColumn}>
        <Level isEmptyCard={true} />
        <Level
          title={`Level 3`}
          imgSrc="/pics/cat.jpg"
          levelNumber={3}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(3)}
        />
        <Level
          title={`Level 4`}
          imgSrc="/pics/cat.jpg"
          levelNumber={4}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(4)}
        />
      </div>
      <div className={s.levelColumn}>
        <Level isEmptyCard={true} />
        <Level
          title={`Level 5`}
          imgSrc="/pics/cat.jpg"
          levelNumber={5}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(5)}
        />
      </div>
      <div className={s.levelColumn}>
        <Level
          title={`Level 6`}
          imgSrc="/pics/cat.jpg"
          levelNumber={6}
          score={0}
          isOpen={false}
          onClick={() => handlePlayClick(6)}
        />
      </div>
    </section>
  );
};
