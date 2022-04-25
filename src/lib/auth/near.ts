/* eslint-disable @typescript-eslint/ban-ts-comment */
import Big from 'big.js';
import 'near-api-js/dist/near-api-js.min.js';

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

// @ts-ignore
const { keyStores, connect, WalletConnection, Contract } = window.nearApi;

// const contractName = 'secret-ingredient.testnet';
const contractName = 'dev-1650888802724-27747003947333';

const config = {
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  contractName,
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  headers: {},
};

// @ts-ignore
let near: any, wallet: any, contract: any;

export const initNear = async () => {
  near = await connect(config);
  wallet = new WalletConnection(near, null);

  contract = await new Contract(wallet.account(), contractName, {
    viewMethods: ['getRankings'],
    changeMethods: ['updateRankings'],
    sender: wallet.getAccountId(),
  });
};

initNear();

export const updateRankings = async (score: number) => {
  if (!contract) {
    return;
  }

  return contract.updateRankings({ score }, BOATLOAD_OF_GAS);
};

export const getRankings = () => {
  if (!contract) {
    return;
  }

  return contract.getRankings();
};

export const signIn = () => {
  if (!wallet) {
    return;
  }

  wallet.requestSignIn(
    { contractId: contractName, methodNames: [contract.updateRankings.name] },
    'Secret Ingredient | Rhythm Game',
    document.location.origin
  );
};

export const signOut = () => {
  if (!wallet) {
    return;
  }

  wallet.signOut();
};

export const isNEARSignedIn = (): boolean => {
  if (!wallet) {
    return false;
  }

  return wallet.isSignedIn();
};

export const getWalletAccountId = (): string | undefined => {
  if (!wallet) {
    return;
  }

  return wallet.getAccountId();
};

export const getWalletAccountNickname = (): string | undefined => {
  const id = getWalletAccountId();

  if (!id) {
    return undefined;
  }

  return id.split('.')[0] || id;
};
