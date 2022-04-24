/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'near-api-js/dist/near-api-js.min.js';

// @ts-ignore
const { keyStores, connect, WalletConnection } = window.nearApi;
const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  headers: {},
};

const near = await connect(config);
const wallet = new WalletConnection(near, null);

export const signIn = () => {
  wallet.requestSignIn(
    'example-contract.testnet', // contract requesting access
    'Secret Ingredient | Rhythm Game', // optional
    document.location.origin // optional
  );
};

export const signOut = () => {
  wallet.signOut();
};

export const isNEARSignedIn = (): boolean => {
  return wallet.isSignedIn();
};

export const getWalletAccountId = (): string => {
  return wallet.getAccountId();
};
