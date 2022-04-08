import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

export enum ModalId {
  GameEnd = 'GameEnd',
}

type ModalsStore = {
  id?: ModalId;
};

export const modalsStore = createStore<ModalsStore>({
  id: undefined,
});

export const useModals = () => {
  const state = useStore(modalsStore);

  return state;
};

export const openModal = createEvent<ModalId>();
export const closeModal = createEvent();

export const openGameEndModal = openModal.prepend(() => ModalId.GameEnd);
