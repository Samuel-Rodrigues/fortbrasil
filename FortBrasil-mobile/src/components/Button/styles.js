import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../components/Button/index';

export const Container = styled(RectButton)`
  height: 46px;
  background: #3b9eff;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
