import api from './api';
import AsyncStorage from '@react-native-community/async-storage';

export async function getToken() {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  return token;
}

export default async function checkAuth() {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return false;
  }

  const headers = {
    Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
  };

  const response = await api.get('/user', {headers});

  return response.data;
}

export function logOut() {
  AsyncStorage.setItem('token', '');
  return;
}
