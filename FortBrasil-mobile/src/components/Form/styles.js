import styled from 'styled-components';
import Input from '../Input/index';
import Button from '../Button/index';
import {Platform} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #444;
`;

export const TInput = styled(Input)`
  margin: 5px;
`;

export const Msg = styled.View`
  height: 30;
  border-radius: 6px;
  width: auto;
  align-items: center;
  align-content: center;
`;

export const TextMsg = styled.Text`
  position: absolute;
  color: #ff6666;
  align-items: center;
  align-content: center;
`;
export const Header = styled.View`
  align-items: center;
  align-content: center;
  margin: 20px;
`;

export const TextHeader = styled.Text`
  color: #eee;
  font-size: 18;
  font-weight: bold;
`;

export const SuccessText = styled.Text`
  font-size: 18px;
  color: green;
  text-align: center;
  align-items: center;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  font-size: 18;
  color: red;
  text-align: center;
  align-items: center;
  font-weight: bold;
`;

export const Info = styled.Text`
  font-size: 14;
  margin-left: 10px;
  margin-top: 20px;
  color: #ccc;
  text-align: left;
  align-items: center;
  font-weight: bold;
`;

export const IButton = styled(Button)`
  margin-top: 10px;
  width: 250px;
  align-content: center;
  align-self: center;
  background: #34c18e;
`;

export const EditButton = styled(Button)`
  margin-top: 10px;
  width: 250px;
  align-content: center;
  align-self: center;
  background: #4477ff;
`;

export const RemoveButton = styled(Button)`
  margin-top: 10px;
  width: 250px;
  align-content: center;
  align-self: center;
  background: #dd4455;
`;

export const CloseModal = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #eee;
  font-size: 22px;
  align-content: center;
  align-self: center;
`;
