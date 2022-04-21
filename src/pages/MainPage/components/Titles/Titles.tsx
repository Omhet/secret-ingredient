import classnames from 'classnames';
import React, { FC, useState } from 'react';
import s from './Titles.module.scss';

export type TitlesProps = {};

export const Titles: FC = () => {
  const [isDariaVisible, setIsDariaVisible] = useState<boolean>(false);
  const [isVladimirVisible, setIsVladimirVisible] = useState<boolean>(false);

  return (
    <section id="titles" className={s.titlesSection}>
      <div className={classnames(s.aboutAuthor, { [s.visible]: isDariaVisible })}>
        <img src="/pics/story.jpg" />
        <span className={s.authorDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque, repellendus distinctio cum enim
          totam id esse iusto? Laudantium hic neque soluta libero adipisci quaerat cupiditate ipsam excepturi cumque
          omnis.
        </span>
      </div>
      <div className={s.titles}>
        <span className={s.titleName}>Design</span>
        <div className={s.titleAuthors}>
          <span
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
          >
            Daria
          </span>
          ,{' '}
          <span
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
          >
            Vladimir
          </span>
        </div>
        <span className={s.titleName}>Development</span>
        <div className={s.titleAuthors}>
          <span
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
          >
            Daria
          </span>
          ,{' '}
          <span
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
          >
            Vladimir
          </span>
        </div>
        <span className={s.titleName}>Music</span>
        <div className={s.titleAuthors}>
          <span
            onMouseOver={() => setIsVladimirVisible(true)}
            onMouseOut={() => setIsVladimirVisible(false)}
            className={s.author}
          >
            Vladimir
          </span>
        </div>
        <span className={s.titleName}>Illustrations</span>
        <div className={s.titleAuthors}>
          <span
            onMouseOver={() => setIsDariaVisible(true)}
            onMouseOut={() => setIsDariaVisible(false)}
            className={s.author}
          >
            Daria
          </span>
        </div>
      </div>
      <div className={classnames(s.aboutAuthor, { [s.visible]: isVladimirVisible })}>
        <img src="/pics/story.jpg" />
        <span className={s.authorDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque, repellendus distinctio cum enim
          totam id esse iusto? Laudantium hic neque soluta libero adipisci quaerat cupiditate ipsam excepturi cumque
          omnis.
        </span>
      </div>
    </section>
  );
};
