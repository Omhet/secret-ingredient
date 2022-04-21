import React, { FC } from 'react';
import s from './Story.module.scss';
import classnames from 'classnames';

export type StoryProps = {};

export const Story: FC = () => {
  return (
    <section id="story" className={s.storyContainer}>
      <div className={classnames(s.storyItem, s.paddingRight)}>
        <div className={classnames(s.imgContainer, s.img1)}>
          <img className={s.image} src="pics/illustration1.png" />
        </div>
        <span className={classnames(s.description, s.alignRight, s.description1)}>
          Once upon a time there lived a little kitten boy who loved to cook. He got that passion for culinary from his
          grandmother. She was and amazing home chef, it was really fascinating to watch her cook. And the taste was
          just meowtastic!
        </span>
      </div>
      <div className={classnames(s.storyItem, s.paddingLeft)}>
        <span className={s.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptas repellat ad voluptate modi
          voluptatem accusantium atque ipsam! Praesentium molestiae culpa dolores obcaecati rerum quia minus at vel enim
          quam.
        </span>
        <div className={s.imgContainer}>
          <img className={s.image} src="pics/illustration2.png" />
        </div>
      </div>
      <div className={classnames(s.storyItem, s.paddingRight)}>
        <div className={s.imgContainer}>
          <img className={s.image} src="pics/illustration3.png" />
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
      {/* <button className={s.nextPageBtn}>Next page</button> */}
    </section>
  );
};
