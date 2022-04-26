import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type MonetizationStore = {
  isEnabled: boolean;
  status?: 'pending' | 'start' | 'stop';
};

export const monetizationStore = createStore<MonetizationStore>({
  isEnabled: document.monetization !== undefined,
  status: undefined,
});

export const useMonetization = () => {
  const state = useStore(monetizationStore);

  return state;
};

export const monetizationStart = createEvent();
export const monetizationPending = createEvent();
export const monetizationStop = createEvent();
