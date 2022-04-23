import classNames from 'classnames';
import React, { FC } from 'react';
import s from './FullScreenMenu.module.scss';
import { motion } from 'framer-motion';
import { Close } from '@icons/Close';
import { menuVariants } from 'motions/FullScreenMenu';
import { NavigationItem } from '@app-types/navigationItem';

type FullScreenMenuProps = {
  isOpen: boolean;
  navigation: NavigationItem[];
  onCloseMenu: () => void;
};

export const FullScreenMenu: FC<FullScreenMenuProps> = ({ isOpen, navigation, onCloseMenu }) => {
  return (
    <motion.div
      key={Number(isOpen)}
      className={classNames(s.menuContainer)}
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <button className={s.closeIconButton} onClick={onCloseMenu}>
        <Close className={s.closeIcon} />
      </button>
      <nav className={s.menu}>
        {navigation.map(({ id, title }) => (
          <a key={id} href={id} className={s.link}>
            {title}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};
