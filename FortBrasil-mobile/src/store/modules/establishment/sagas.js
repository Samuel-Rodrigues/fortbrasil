import {call, put, all, takeLatest} from 'redux-saga/effects';

import * as Toast from '../../../components/Toast/index';

import AsyncStorage from '@react-native-community/async-storage';

import checkAuth, {logOut} from '../../../services/auth';

import api from '../../../services/api';

import {addStablishmentSuccess, deleteStablishmentSuccess} from './actions';

function* addEstablishment(action) {
  if (checkAuth) {
    const token = yield AsyncStorage.getItem('token');
    console.log(token);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = yield call(
        api.post,
        '/establishments',
        action.establishment,
        {headers},
      );
      yield put(addStablishmentSuccess(response.data));
      Toast.successIcon('Criado');
    } catch (error) {
      console.log('ERRO', error.response.data.error);
    }
  }
}

function* deleteEstablishment(action) {
  if (checkAuth) {
    const token = yield AsyncStorage.getItem('token');
    console.log(token);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = yield call(
        api.delete,
        `/establishments/${action.establishment.id}`,
        {headers},
      );
      yield put(deleteStablishmentSuccess(action.establishment));
      Toast.successIcon('Deletado');
    } catch (error) {
      console.log('ERRO', error.response.data.error);
    }
  }
}

export default all([
  takeLatest('ADD_ESTABLISHMENT/REQUEST', addEstablishment),
  takeLatest('DELETE_ESTABLISHMENT/REQUEST', deleteEstablishment),
]);
