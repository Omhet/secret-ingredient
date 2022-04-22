import React, { FC } from 'react';
import s from './Story.module.scss';
import classnames from 'classnames';

export type StoryProps = {};

export const Story: FC = () => {
  return (
    <section id="story" className={s.storyContainer}>
      <div className={s.storyItem1}>
        <div className={classnames(s.imgContainer, s.img1)}>
          <img className={s.image} src="pics/illustration1.png" />
        </div>
        <span className={s.description1}>
          Once upon a time there lived a little kitten boy who loved to cook. He got that passion for culinary from his
          grandma. She was and amazing home chef, it was really fascinating to watch her cook. And the taste was just
          meowtastic!
        </span>
      </div>
      <div className={s.storyItem2}>
        <span className={s.description2}>
          So he decided to become a great chef as his grandma was, and even went to special chefs school, because he
          thought it wasn&apos;t enough to study at home. He was so excited after the graduation! He felt like now he
          was finally ready to rock and shine.
        </span>
        <div className={classnames(s.imgContainer, s.img2)}>
          <img className={s.image} src="pics/illustration2.png" />
        </div>
      </div>
      <div className={s.storyItem3}>
        <div className={classnames(s.imgContainer, s.img3)}>
          <img className={s.image} src="pics/illustration3.png" />
        </div>
        <span className={s.description3}>
          But soon he realized that something was wrong. Maybe it was a cooking technique, maybe some spices were
          missing... His dishes were not good enough, they were some kind of raw, uncooked. That fact was totally
          confusing and irritating.
        </span>
      </div>
      <div className={s.storyItem4}>
        <span className={s.description4}>
          Fortunately, he had no habit of despair! He brainstormed a little bit and made up with a plan. So was going to
          travel all over the world and visit the best local chefs to learn their secrets.
        </span>
        <div className={classnames(s.imgContainer, s.img4)}>
          <img className={s.image} src="pics/illustration4.png" />
        </div>
      </div>
      <div className={s.storyItem5}>
        <span className={s.description5}>That was the plan. Let&apos;s find out together what happened next.</span>
        <div className={classnames(s.imgContainer)}>
          <img className={s.image} src="pics/illustration5.png" />
        </div>
      </div>
    </section>
  );
};
