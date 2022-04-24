import { NavigationItem } from '@app-types/navigationItem';
import { Burger } from '@icons/Burger';
import { useLevels } from '@store/levels';
import { signIn, signOut, useUser } from '@store/user';
import { motion } from 'framer-motion';
import { navItemVariants } from 'motions/motions';
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
      <div className={s.logo}>
        Secret <br />
        Ingredient
      </div>
      <div className={s.headerContent}>
        {!isSmall && (
          <nav className={s.navContainer}>
            {navigation.map(({ id, title }) => (
              <motion.a whileHover="hover" variants={navItemVariants} key={id} href={id} className={s.navItem}>
                {title}
              </motion.a>
            ))}
          </nav>
        )}
        <div className={s.score}>
          <span> Score: {globalScore}</span>
          <img className={s.logoImg} src="/pics/cake.png" />
        </div>
        {user.isSignedIn ? (
          <>
            <button className={s.menuBtn} onClick={() => signOut()}>
              Disconnect
            </button>
          </>
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
