import { Spinner } from '@components/Spinner/Spinner';
import { useMonetization } from '@store/monetization';
import { motion } from 'framer-motion';
import { buttonVariants } from 'motions/motions';
import React, { FC } from 'react';
import s from './MonetizationBanner.module.scss';

const backgroundSrc = '/pics/banner.png';

export const MonetizationBanner: FC = () => {
  const { isEnabled, status } = useMonetization();

  if (!isEnabled) {
    return (
      <div style={{ backgroundImage: `url("${backgroundSrc}")` }} className={s.main}>
        <div className={s.content}>
          <img className={s.head} src="/pics/smilingHead.png" />
          <div className={s.textContent}>
            <span className={s.header}>Hey there!</span>
            <span className={s.text}>
              <span>We have exclusive content. Please, sign up for </span>
              <a className={s.link} href="https://coil.com/" target="_blank" rel="noreferrer">
                Coil
              </a>
              <span> to access it</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'stop' || status === undefined) {
    return (
      <div style={{ backgroundImage: `url("${backgroundSrc}")` }} className={s.main}>
        <div className={s.content}>
          <img className={s.head} src="/pics/smilingHead.png" />
          <div className={s.textContent}>
            <span className={s.header}>Hey there!</span>
            <span className={s.text}>Please, turn on web monetization to access exclusive content</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundImage: `url("${backgroundSrc}")` }} className={s.main}>
      {status === 'pending' && (
        <div className={s.loading}>
          <Spinner className={s.spinner} />
          <span className={s.text}>Wait a sec. Loading...</span>
        </div>
      )}
      {status === 'start' && (
        <div className={s.content}>
          <img className={s.head} src="/pics/excitedHead.png" />
          <div className={s.textContainer}>
            <span className={s.text}>Thank you! Here is your content. Enjoy!</span>
            <motion.a
              whileHover="hover"
              variants={buttonVariants}
              className={s.downloadBtn}
              href="https://drive.google.com/drive/folders/1WnKUkRkK5YpwwXnHSiLR-0hGgusfzZpZ?usp=sharing"
              target="_blank"
            >
              Download
            </motion.a>
          </div>
        </div>
      )}
    </div>
  );
};
