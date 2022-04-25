import { NavigationItem } from '@app-types/navigationItem';
import { FullScreenMenu } from '@components/FullScreenMenu/FullScreenMenu';
import { Header } from '@components/Header/Header';
import { useLevels } from '@store/levels';
import { useUser } from '@store/user';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useState } from 'react';
import { toggleFreezePage } from 'utils/toggleFreezePage';
import { Hero } from './components/Hero/Hero';
import { Levels } from './components/Levels/Levels';
import { Rankings } from './components/Rankings/Rankings';
import { Rules } from './components/Rules/Rules';
import { Story } from './components/Story/Story';
import { Titles } from './components/Titles/Titles';
import s from './MainPage.module.scss';

const navigation: NavigationItem[] = [
  { id: '#story', title: 'Story' },
  { id: '#rules', title: 'How to play' },
  { id: '#levels', title: 'Levels' },
  { id: '#rankings', title: 'Rankings' },
  { id: '#titles', title: 'Titles' },
];

export type MainPageProps = {};

export const MainPage: FC = () => {
  const user = useUser();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const { globalScore } = useLevels();
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
        {globalScore > 0 && (
          <div className={s.score}>
            <span> Score: {globalScore}</span>
            <img className={s.logoImg} src="/pics/cake.png" />
          </div>
        )}
        <Hero />
        <Story />
        <Rules />
        <Levels />
        {!user.isError && <Rankings />}
        <Titles />
      </main>
      <AnimatePresence exitBeforeEnter>
        {isMenuOpen && <FullScreenMenu navigation={navigation} onCloseMenu={closeMenu} isOpen={isMenuOpen} />}
      </AnimatePresence>
    </>
  );
};
