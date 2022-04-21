import React, { FC, useEffect, useRef } from 'react';
import { createPixiApp } from './PixiApp/createPixiApp';

export interface SceneProps {}

export const Scene: FC<SceneProps> = ({}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const app = createPixiApp();

    ref.current.appendChild(app.view);
    app.start();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  return <div style={{ zIndex: 1, height: '100vh' }} ref={ref} />;
};
