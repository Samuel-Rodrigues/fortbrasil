import React, {Component} from 'react';
import {Text} from 'react-native';
import Background from '../../components/Background/index';
import {Container} from './styles';
import Maps from '../Maps/index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
      headerTransparent: true,
      title: 'Home',
    });
  }

  render() {
    return (
      <Background>
        <Container>
          <Maps />
        </Container>
      </Background>
    );
  }
}

export default Home;
