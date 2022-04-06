---
to: src/pages/<%= h.changeCase.pascal(name) %>Page/<%= h.changeCase.pascal(name) %>Page.tsx
---
import React, { FC } from 'react';
import s from './<%= h.changeCase.pascal(name) %>Page.module.scss';

export interface <%= h.changeCase.pascal(name) %>PageProps {}

export const <%= h.changeCase.pascal(name) %>Page: FC<<%= h.changeCase.pascal(name) %>Props> = ({}) => {
  return (
    <div className={s.main}>
    </div>
  );
};
