import { getWalletAccountNickname, isNEARSignedIn } from '@lib/auth/near';
import { createEffect, createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type UserStore = {
  isSignedIn: boolean;
  name?: string;
  isError: boolean;
};

export const userStore = createStore<UserStore>({
  isSignedIn: isNEARSignedIn(),
  name: getWalletAccountNickname(),
  isError: false,
});

export const useUser = () => {
  const state = useStore(userStore);
  const isLoading = useStore(initUser.pending);

  return {
    ...state,
    isLoading,
  };
};

export const resetUser = createEvent();

export const signIn = createEvent();
export const signOut = createEvent();

export const initUser = createEffect<void, void, Error>();
