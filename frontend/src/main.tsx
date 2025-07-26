import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PedidoProvider } from './PedidoContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </React.StrictMode>
);
