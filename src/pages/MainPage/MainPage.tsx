import { Header } from '@components/Header/Header';
import React, { FC } from 'react';
import { Hero } from './components/Hero/Hero';
import { Levels } from './components/Levels/Levels';
import { Rules } from './components/Rules/Rules';
import { Story } from './components/Story/Story';
import { Titles } from './components/Titles/Titles';
import s from './MainPage.module.scss';

export type MainPageProps = {};

export const MainPage: FC = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <Hero />
        <Story />
        <Rules />
        <Levels />
        <Titles />
      </main>
    </>
  );
};
