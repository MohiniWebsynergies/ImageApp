import {delay} from 'redux-saga';
import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  take,
  fork,
} from 'redux-saga/effects';
import {ActionTypes} from '../reducers/constants';
import {DataService} from '../Services/DataService';

/**
 * Login
 */
export function* fetchImages() {
  try {
    console.log('response');
    yield call(delay, 200);
    let response = yield call(DataService.fetchServerImages);
    console.log('response', response);

    yield put({
      type: ActionTypes.IMAGES_FETCHED,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    console.log('some error', err);
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.FETCH_SERVER_IMAGES, fetchImages)]);
}
