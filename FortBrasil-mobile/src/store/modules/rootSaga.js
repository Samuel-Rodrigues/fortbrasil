import {all} from 'redux-saga/effects';

import establishment from './establishment/sagas';

export default function* rootSaga() {
  return yield all([establishment]);
}
