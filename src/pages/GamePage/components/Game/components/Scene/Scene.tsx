import React, { FC, useEffect, useRef } from 'react';
import { createPixiApp } from './PixiApp/createPixiApp';

export interface SceneProps {}

export const Scene: FC<SceneProps> = ({}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const { app, game } = createPixiApp();

    ref.current.appendChild(app.view);
    app.start();

    return () => {
      game.keyboardManager.disable();
      game.mouseManager.disable();
      app.destroy(true);
    };
  }, []);

  return <div style={{ zIndex: 1, height: '100vh' }} ref={ref} />;
};
