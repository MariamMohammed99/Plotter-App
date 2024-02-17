import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const customMiddleware = (getDefaultMiddleware: any) => {
  return getDefaultMiddleware().concat(sagaMiddleware);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => customMiddleware(getDefaultMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
