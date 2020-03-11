import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  colors: ['#aaa', '#006600'],
})`
  flex: 1;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;
