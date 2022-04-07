import { App } from '@components/App/App';
import '@store/init';
import '@style/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
