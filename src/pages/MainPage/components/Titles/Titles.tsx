import { Arrow } from '@icons/Arrow';
import React, { FC, useState } from 'react';
import { useMedia } from 'react-use';
import s from './Titles.module.scss';

export const Titles: FC = () => {
  const isSmall = useMedia('(max-width: 1024px)');
  const [isDariaVisible, setIsDariaVisible] = useState<boolean>(false);
  const [isVladimirVisible, setIsVladimirVisible] = useState<boolean>(false);

  return (
    <section id="titles" className={s.titlesSection}>
      {isSmall && <span className={s.titlesTitle}>Authors</span>}
      <div className={s.titles}>
        <span className={s.titleName}>Design</span>
        <div className={s.titleAuthors}>
          <a
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
            href="https://airadavometra.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daria
          </a>
          ,{' '}
          <a
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
            href="https://vlivanov.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vladimir
          </a>
        </div>
        <span className={s.titleName}>Development</span>
        <div className={s.titleAuthors}>
          <a
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
            href="https://vlivanov.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vladimir
          </a>
          ,{' '}
          <a
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
            href="https://airadavometra.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daria
          </a>
        </div>
        <span className={s.titleName}>Music</span>
        <div className={s.titleAuthors}>
          <a
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
            href="https://vlivanov.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vladimir
          </a>
        </div>
        <span className={s.titleName}>Illustrations</span>
        <div className={s.titleAuthors}>
          <a
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
            href="https://airadavometra.space/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daria
          </a>
        </div>
      </div>
      {!isDariaVisible && !isVladimirVisible && !isSmall && (
        <div className={s.emptyContainer}>
          <Arrow className={s.arrow} />
          <div className={s.titleContainer}>
            <span className={s.title}>Authors</span>
            <span className={s.note}>Hover over our names to see more info</span>
          </div>
        </div>
      )}
      {(isDariaVisible || isSmall) && (
        <div className={s.aboutAuthor}>
          <img src="/pics/Dasha.png" />
          <span className={s.authorDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque, repellendus distinctio cum enim
            totam id esse iusto? Laudantium hic neque soluta libero adipisci quaerat cupiditate ipsam excepturi cumque
            omnis.
          </span>
        </div>
      )}
      {(isVladimirVisible || isSmall) && (
        <div className={s.aboutAuthor}>
          <img src="/pics/Vova.png" />
          <span className={s.authorDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque, repellendus distinctio cum enim
            totam id esse iusto? Laudantium hic neque soluta libero adipisci quaerat cupiditate ipsam excepturi cumque
            omnis.
          </span>
        </div>
      )}
    </section>
  );
};
