import React from 'react';
import Routes from './routes';
import {Provider} from 'react-redux';
import './config/ReactotronConfig';
import store from './store/index';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
