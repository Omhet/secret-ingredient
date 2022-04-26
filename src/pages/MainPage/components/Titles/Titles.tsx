import { Arrow } from '@icons/Arrow';
import { motion } from 'framer-motion';
import { authorLinkVariants, authorVariants } from 'motions/motions';
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
        <motion.div className={s.titleAuthors} variants={authorLinkVariants} animate="animate" custom={0}>
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
        </motion.div>
        <span className={s.titleName}>Development</span>
        <motion.div className={s.titleAuthors} variants={authorLinkVariants} animate="animate" custom={0.2}>
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
        </motion.div>
        <span className={s.titleName}>Music</span>
        <motion.div className={s.titleAuthors} variants={authorLinkVariants} animate="animate" custom={0.4}>
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
        </motion.div>
        <span className={s.titleName}>Illustrations</span>
        <motion.div className={s.titleAuthors} variants={authorLinkVariants} animate="animate" custom={0.6}>
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
        </motion.div>
      </div>
      {!isDariaVisible && !isVladimirVisible && !isSmall && (
        <motion.div
          className={s.emptyContainer}
          variants={authorVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Arrow className={s.arrow} />
          <div className={s.titleContainer}>
            <span className={s.title}>Authors</span>
            <span className={s.note}>Follow the links to know more about us</span>
          </div>
        </motion.div>
      )}
      {(isDariaVisible || isSmall) && (
        <motion.div className={s.aboutAuthor} variants={authorVariants} initial="hidden" animate="visible" exit="exit">
          <img src="/pics/Dasha.png" />
        </motion.div>
      )}
      {(isVladimirVisible || isSmall) && (
        <motion.div className={s.aboutAuthor} variants={authorVariants} initial="hidden" animate="visible" exit="exit">
          <img src="/pics/Vova.png" />
        </motion.div>
      )}
    </section>
  );
};
