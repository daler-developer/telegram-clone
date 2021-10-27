import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'redux/store';
import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={'/telegram-clone'}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
