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
import AppStorage from '../Util/AppStorage';

/**
 * fetchImages
 */
export function* fetchImages() {
  try {
    yield call(delay, 200);
    let response = yield call(DataService.fetchServerImages);

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
 * imageFetchComplete
 */
export function* imageSaveCompleted() {
  try {
    yield call(delay, 200);

    yield put({
      type: ActionTypes.IMAGE_SAVED,
    });
  } catch (err) {
    /* istanbul ignore next */
  }
}

/**
 * imageSaveComplete
 */
export function* imageSaveComplete(action) {
  try {
    yield call(delay, 200);
    const {payload} = action;
    let response = yield call(DataService.fetchLocalImages, payload);
    yield put({
      type: ActionTypes.IMAGES_SAVED_COMPLETED,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.FETCH_SERVER_IMAGES, fetchImages)]);
  yield all([takeLatest(ActionTypes.IMAGES_SAVED_COMPLETE, imageSaveComplete)]);
  yield all([takeLatest(ActionTypes.IMAGE_SAVE, imageSaveCompleted)]);
}
