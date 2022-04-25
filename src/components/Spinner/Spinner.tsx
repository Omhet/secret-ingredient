import React, { FC } from 'react';
import s from './Spinner.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={s.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
