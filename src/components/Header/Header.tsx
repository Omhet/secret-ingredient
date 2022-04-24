import { NavigationItem } from '@app-types/navigationItem';
import { Burger } from '@icons/Burger';
import { signIn } from '@lib/auth/near';
import { useLevels } from '@store/levels';
import { useUser } from '@store/user';
import React, { FC } from 'react';
import { useMedia } from 'react-use';
import s from './Header.module.scss';

export type HeaderProps = {
  onOpenMenu: () => void;
  navigation: NavigationItem[];
};

export const Header: FC<HeaderProps> = ({ navigation, onOpenMenu }) => {
  const { globalScore } = useLevels();
  const user = useUser();

  const isSmall = useMedia('(max-width: 1024px)');
  return (
    <header className={s.headerContainer}>
      <div className={s.logo}>Secret Ingredient</div>
      <div className={s.headerContent}>
        <a href="#levels" className={s.playBtn}>
          Play
        </a>
        {!isSmall && (
          <nav className={s.navContainer}>
            {navigation.map(({ id, title }) => (
              <a key={id} href={id} className={s.navItem}>
                {title}
              </a>
            ))}
          </nav>
        )}
        <div className={s.score}>
          <span> Score: {globalScore}</span>
          <img className={s.logoImg} src="/pics/cake.png" />
        </div>
        {user.isSignedIn ? (
          <div>Hi, {user.name}</div>
        ) : (
          <button className={s.menuBtn} onClick={() => signIn()}>
            Connect
          </button>
        )}
        {isSmall && (
          <button className={s.menuBtn} onClick={onOpenMenu}>
            <Burger className={s.menuBtn} />
          </button>
        )}
      </div>
    </header>
  );
};
