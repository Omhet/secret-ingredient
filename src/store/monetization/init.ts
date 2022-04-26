import { monetizationPending, monetizationStart, monetizationStop, monetizationStore } from './index';

monetizationStore
  //
  .on(monetizationStart, (state) => ({ ...state, status: 'start' }))
  .on(monetizationPending, (state) => ({ ...state, status: 'pending' }))
  .on(monetizationStop, (state) => ({ ...state, status: 'stop' }));

if (document.monetization) {
  document.monetization.addEventListener('monetizationpending', () => {
    monetizationPending();
  });
  document.monetization.addEventListener('monetizationstart', () => {
    monetizationStart();
  });
  document.monetization.addEventListener('monetizationstop', () => {
    monetizationStop();
  });
}
