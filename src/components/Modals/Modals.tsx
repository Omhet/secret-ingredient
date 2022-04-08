import { ModalId, useModals } from '@store/modals';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { GameEndModal } from './components/GameEndModal/GameEndModal';
import s from './Modals.module.scss';

const MODAL_ID_MAP: Record<ModalId, FC> = {
  [ModalId.GameEnd]: GameEndModal,
};

export const Modals: FC = () => {
  const { id } = useModals();
  console.log(id);

  if (!id) {
    return null;
  }

  const ModalComponent = MODAL_ID_MAP[id];
  console.log(ModalComponent);

  return ReactDOM.createPortal(
    <div className={s.root}>
      <ModalComponent />
    </div>,
    document.getElementById('modal-root') as Element
  );
};
