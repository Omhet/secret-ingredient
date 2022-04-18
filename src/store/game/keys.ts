import { createEvent, Event, sample } from 'effector';

export const keydown = createEvent<KeyboardEvent>();
export const click = createEvent<MouseEvent>();

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (evt) => keydown(evt));
  document.addEventListener('click', (evt) => click(evt));
}

export const keyEvent = (): Event<KeyboardEvent | MouseEvent> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return sample({
    clock: [keydown, click],
  });
};
