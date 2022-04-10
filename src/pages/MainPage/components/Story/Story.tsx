import React, { FC } from 'react';
import s from './Story.module.scss';
import classnames from 'classnames';

export type StoryProps = {};

export const Story: FC = () => {
  return (
    <section className={s.storyContainer}>
      <div className={classnames(s.storyItem, s.paddingLeft)}>
        <span className={s.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptas repellat ad voluptate modi
          voluptatem accusantium atque ipsam! Praesentium molestiae culpa dolores obcaecati rerum quia minus at vel enim
          quam.
        </span>
        <div className={s.imgContainer}>
          <img className={s.image} src="pics/story.jpg" />
        </div>
      </div>
      <div className={classnames(s.storyItem, s.paddingRight)}>
        <div className={s.imgContainer}>
          <img className={s.image} src="pics/story.jpg" />
        </div>
        <span className={classnames(s.description, s.alignRight)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptas repellat ad voluptate modi
          voluptatem accusantium atque ipsam! Praesentium molestiae culpa dolores obcaecati rerum quia minus at vel enim
          quam.
        </span>
      </div>
      {
        // TODO сделать эту кнопку видимой только у секции с историей
      }
      <button className={s.nextPageBtn}>Next page</button>
    </section>
  );
};
