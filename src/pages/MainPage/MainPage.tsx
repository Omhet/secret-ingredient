import React, { FC, useState } from 'react';
import { Hero } from './components/Hero/Hero';
import { Levels } from './components/Levels/Levels';
import { Rules } from './components/Rules/Rules';
import { Story } from './components/Story/Story';
import { Titles } from './components/Titles/Titles';
import s from './MainPage.module.scss';
import { Header } from '@components/Header/Header';
import { AnimatePresence } from 'framer-motion';
import { FullScreenMenu } from '@components/FullScreenMenu/FullScreenMenu';
import { toggleFreezePage } from 'utils/toggleFreezePage';
import { NavigationItem } from '@app-types/navigationItem';

const navigation: NavigationItem[] = [
  { id: '#story', title: 'Story' },
  { id: '#rules', title: 'How to play' },
  { id: '#levels', title: 'Levels' },
  { id: '#titles', title: 'Titles' },
];

export type MainPageProps = {};

export const MainPage: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const openMenu = () => {
    setMenuOpen(true);
    toggleFreezePage();
  };
  const closeMenu = () => {
    setMenuOpen(false);
    toggleFreezePage();
  };
  return (
    <>
      <Header onOpenMenu={openMenu} navigation={navigation} />
      <main className={s.main}>
        <Hero />
        <Story />
        <Rules />
        <Levels />
        <Titles />
      </main>
      <AnimatePresence exitBeforeEnter>
        {isMenuOpen && <FullScreenMenu navigation={navigation} onCloseMenu={closeMenu} isOpen={isMenuOpen} />}
      </AnimatePresence>
    </>
  );
};
