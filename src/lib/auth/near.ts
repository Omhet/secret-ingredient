/* eslint-disable @typescript-eslint/ban-ts-comment */
import Big from 'big.js';
import 'near-api-js/dist/near-api-js.min.js';

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

// @ts-ignore
const { keyStores, connect, WalletConnection, Contract } = window.nearApi;

// const contractName = 'secret-ingredient.testnet';
const contractName = 'dev-1650872143665-27068890039705';

const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  contractName,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  headers: {},
};

const near = await connect(config);
const wallet = new WalletConnection(near, null);

const contract = await new Contract(wallet.account(), contractName, {
  viewMethods: ['getRankings'],
  changeMethods: ['updateRankings'],
  sender: wallet.getAccountId(),
});

export const updateRankings = (score: number) => {
  return contract.updateRankings({ score }, BOATLOAD_OF_GAS);
};

export const getRankings = () => {
  return contract.getRankings();
};

export const signIn = () => {
  wallet.requestSignIn(
    { contractId: contractName, methodNames: [contract.updateRankings.name] },
    'Secret Ingredient | Rhythm Game',
    document.location.origin
  );
};

export const signOut = () => {
  wallet.signOut();
};

export const isNEARSignedIn = (): boolean => {
  return wallet.isSignedIn();
};

export const getWalletAccountId = (): string | undefined => {
  return wallet.getAccountId();
};

export const getWalletAccountNickname = (): string | undefined => {
  const id = getWalletAccountId();

  if (!id) {
    return undefined;
  }

  return id.split('.')[0] || id;
};
