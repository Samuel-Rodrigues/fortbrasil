import React, {Component, createRef} from 'react';
import {Image, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Background from '../../components/Background/index';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SingLink,
  SingLinkText,
  ErroText,
} from './styles';

class Singnin extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.setOptions({
      headerTransparent: true,
      title: 'Login',
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
    });
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('Maps');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const {email, password} = this.props.route.params;
      this.setState({email, password});
    }

    const {token} = this.state;

    if (prevState.token !== token) {
      AsyncStorage.setItem('token', JSON.stringify(token));
    }
  }

  state = {
    isLoading: '',
    token: '',
    email: 'samuel22@gmail.com',
    password: '123456',
    errMsg: '',
  };

  async handleSubmit() {
    this.setState({isLoading: true});
    const {email, password} = this.state;

    if (!(email || password)) {
      this.setState({errMsg: 'Algum Campo em branco'});
      this.setState({isLoading: false});
      return;
    }

    const response = await api
      .post('/session', {
        email,
        password,
      })
      .then(res => {
        this.setState({token: res.data.token, isLoading: false});
        AsyncStorage.setItem('token', res.data.token);
        this.props.navigation.navigate('Maps');
      })
      .catch(err => {
        this.setState({errMsg: err.response.data.error, isLoading: false});
        console.warn(err.response.status, err.response.data.error);
      });
  }

  render() {
    const passwordRef = createRef();
    const {navigation} = this.props;
    const {errMsg, isLoading} = this.state;
    return (
      <Background>
        <Container>
          <Form>
            <FormInput
              icon="mail-outline"
              value={this.state.email}
              onChangeText={text => {
                this.setState({email: text});
              }}
              kayboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu email"
              returnKeyType="next" // Ao clicar em dar focus no botao seguinte
              // Ao clicar em enviar, vai saltar para o protao 'password'
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <FormInput
              icon="lock-outline"
              value={this.state.password}
              onChangeText={text => {
                this.setState({password: text});
              }}
              name="password"
              secureTextEntry
              placeholder="Digite sua senha"
              ref={passwordRef} // Nomeia o botao
              returnKeyType="send" // Send Submit form
              onSubmitEditing={this.handleSubmit}
            />
            {errMsg ? <ErroText>{errMsg}</ErroText> : <></>}

            <SubmitButton
              loading={isLoading}
              onPress={e => {
                this.handleSubmit(e);
              }}>
              {' '}
              Acessar
            </SubmitButton>
          </Form>
          <SingLink
            type="submit"
            onPress={() => {
              navigation.navigate('SingnUp');
            }}>
            <SingLinkText>Criar conta gratuita</SingLinkText>
          </SingLink>
          <SingLink
            type="submit"
            onPress={() => {
              navigation.navigate('ListEstablishments');
            }}>
            <SingLinkText>Lista de estabelecimentos</SingLinkText>
          </SingLink>
        </Container>
      </Background>
    );
  }
}
export default Singnin;
