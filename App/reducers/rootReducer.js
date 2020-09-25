import {handleActions} from 'redux-actions';
import immutable from 'immutability-helper';

import {ActionTypes} from './constants';
export const rootState = {
  localImages: [],
  serverImages: [],
};

export default {
  root: handleActions(
    {
      [ActionTypes.IMAGES_FETCHED]: (state, {payload}) => {
        return immutable(state, {
          serverImages: {$set: payload},
        });
      },
      [ActionTypes.IMAGE_SAVED]: (state, {payload}) => {
        return immutable(state, {
          localImages: {$set: payload},
        });
      },
    },
    rootState,
  ),
};
