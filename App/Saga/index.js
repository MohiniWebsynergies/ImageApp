import {all,fork} from 'redux-saga/effects';
import rootSage from './rootSaga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    fork(rootSage),
  ]);
}
