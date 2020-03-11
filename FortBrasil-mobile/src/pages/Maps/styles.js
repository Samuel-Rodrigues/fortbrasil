import styled from 'styled-components';
import {Platform} from 'react-native';
import {StyleSheet, ScrollView, TextInput} from 'react-native';

export const stylesSheet = StyleSheet.create({
  stylesMaps: {
    flex: 1,
    height: 400,
    width: 450,
  },
  searForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: 'row',
  },
  addButon: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 4, height: 4},
    elevation: 2,
  },
  addButton: {
    flex: 1,
    marginLeft: 'auto',
    flexDirection: 'column',
    marginRight: 20,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  logoffButton: {
    width: 50,
    flexDirection: 'column',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  icon: {
    margin: 'auto',
    color: 'red',
  },
});

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})``;

export const Scroll = styled.ScrollView``;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-color: #fff;
  border-width: 4px;
`;

export const ContainerCallout = styled.View`
  width: 260px;
`;

export const TextCallout = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const AddressCallout = styled.Text`
  color: #666;
  margin-top: 5px;
`;
