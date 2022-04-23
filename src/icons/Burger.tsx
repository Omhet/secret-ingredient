import { WithClassName } from '@app-types/common';
import React from 'react';
import { FC } from 'react';

export const Burger: FC<WithClassName> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4.75 5.75H19.25"
      ></path>
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4.75 18.25H19.25"
      ></path>
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M4.75 12H19.25"
      ></path>
    </svg>
  );
};
