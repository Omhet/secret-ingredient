import React, { FC } from 'react';
import classes from './NotFoundPage.module.scss';

export interface NotFoundPageProps {}

export const NotFoundPage: FC = () => {
  return <div className={classes.main}>404</div>;
};
