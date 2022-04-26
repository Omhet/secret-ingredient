import { useMonetization } from '@store/monetization';
import React, { FC } from 'react';
import s from './MonetizationBanner.module.scss';

export const MonetizationBanner: FC = () => {
  const { isEnabled, status } = useMonetization();

  console.log({ isEnabled, status });

  if (!isEnabled || status === 'stop' || status === undefined) {
    return <div className={s.main}>Please, turn on web monetization to access exclusive content</div>;
  }

  return (
    <div className={s.main}>
      {status === 'pending' && <div>Loading</div>}
      {status === 'start' && <div>Thank you! Here is your content. Enjoy</div>}
    </div>
  );
};
