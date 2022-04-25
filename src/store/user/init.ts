import {
  getWalletAccountNickname,
  initNear,
  isNEARSignedIn,
  signIn as nearSignIn,
  signOut as nearSignOut,
} from '@lib/auth/near';
import { initUser, resetUser, signIn, signOut, userStore } from './index';

userStore
  //
  .on(initUser.done, (state) => ({
    ...state,
    isSignedIn: isNEARSignedIn(),
    name: getWalletAccountNickname(),
    isError: false,
  }))
  .on(initUser.fail, (state) => ({ ...state, isSignedIn: false, name: undefined, isError: true }))
  .on(resetUser, () => ({ isSignedIn: false, name: undefined, isError: false }));

signOut.watch(() => {
  nearSignOut();
  resetUser();
});

signIn.watch((props) => {
  nearSignIn(props?.withUpdate);
});

initUser.use(() => initNear());
