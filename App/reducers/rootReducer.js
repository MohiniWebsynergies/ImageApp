import {handleActions} from 'redux-actions';
import immutable from 'immutability-helper';

import {ActionTypes} from './constants';
export const rootState = {
  localImages: [],
  serverImages: [],
  serverFetched: false,
  localImageSaved: false,
};

export default {
  root: handleActions(
    {
      [ActionTypes.IMAGES_FETCHED]: (state, {payload}) => {
        return immutable(state, {
          serverImages: {$set: payload.serverImages},
          localImages: {$set: payload.localImages},
          serverFetched: {$set: true},
        });
      },
    [ActionTypes.IMAGES_SAVED]: (state, {payload}) => {
        return immutable(state, {
          localImageSaved: {$set: false},
        });
      },
      [ActionTypes.IMAGES_SAVED_COMPLETED]: (state, {payload}) => {
        return immutable(state, {
          localImages: {$set: payload},
          localImageSaved: {$set: true},
        });
      },
    },
    rootState,
  ),
};
