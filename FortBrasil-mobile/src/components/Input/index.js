import React, {forwardRef} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, TInput} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {Icon && <Icon name={icon} size={22} color="rgba(255, 255, 255, 0.6)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}
export default forwardRef(Input);
