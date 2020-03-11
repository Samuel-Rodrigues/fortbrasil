import styled from 'styled-components';
import {Platform} from 'react-native';

import Input from '../../components/Input/index';

import Button from '../../components/Button/index';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const SingLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SingLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const ErroText = styled.Text`
  align-content: center;
  align-self: center;
  color: #dd2233;
  font-weight: bold;
  font-size: 16px;
`;
