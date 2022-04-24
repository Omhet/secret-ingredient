import { getWalletAccountNickname, isNEARSignedIn } from '@lib/auth/near';
import { createStore } from 'effector';
import { useStore } from 'effector-react';

type UserStore = {
  isSignedIn: boolean;
  name?: string;
};

export const userStore = createStore<UserStore>({
  isSignedIn: isNEARSignedIn(),
  name: getWalletAccountNickname(),
});

export const useUser = () => {
  const state = useStore(userStore);

  return state;
};
