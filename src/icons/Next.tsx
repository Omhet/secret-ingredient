import { WithClassName } from '@app-types/common';
import React, { FC } from 'react';

export const Next: FC<WithClassName> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m12 16 4-4-4-4M8 12h8" />
    </svg>
  );
};
