import { getWalletAccountId, isNEARSignedIn } from '@lib/auth/near';
import { createStore } from 'effector';
import { useStore } from 'effector-react';

type UserStore = {
  isSignedIn: boolean;
  id: string;
};

export const userStore = createStore<UserStore>({
  isSignedIn: isNEARSignedIn(),
  id: getWalletAccountId(),
});

export const useUser = () => {
  const state = useStore(userStore);

  return state;
};
