import { all, ForkEffect } from 'redux-saga/effects';
import { watchFetchColumns, watchFetchData } from './plotter.saga';

type Watcher = Generator<ForkEffect<never>, void, unknown>;
const watchers: Watcher[] = [watchFetchColumns(), watchFetchData()];

export default function* rootSaga() {
  yield all([...watchers]);
}
