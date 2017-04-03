import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        createLogger(),
        thunk
      ),
      persistState()
    )
  );
  return store;
}
