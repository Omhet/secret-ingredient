import { signIn as nearSignIn, signOut as nearSignOut } from '@lib/auth/near';
import { resetUser, signIn, signOut, userStore } from './index';

userStore
  //
  .on(resetUser, () => ({ isSignedIn: false, name: undefined }));

signOut.watch(() => {
  nearSignOut();
  resetUser();
});

signIn.watch(() => {
  nearSignIn();
});
