
import React from 'react';
import ReactDOM from 'react-dom';


import '@/utils/head'
import '@/utils/i18n'

import App from './App';
import store from '@/store'
import { Provider } from 'react-redux'
import './index.scss';


ReactDOM.render(
   <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
