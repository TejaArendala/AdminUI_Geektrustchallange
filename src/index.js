import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SnackbarProvider } from "notistack";


ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
    <App /> 
    </SnackbarProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

