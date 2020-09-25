import configureStore from './CreateStore';
import rootSaga from '../Saga';
import rootReducer from '../reducers';

export default () => {
  let {store, persistor} = configureStore(rootReducer, rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return {store, persistor};
};
