import React, {Component, createRef} from 'react';
import {Image} from 'react-native';
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

class SingnUp extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setOptions({
      headerTransparent: true,
      title: 'inscrever-se',
      headerTintColor: '#fff',
      headerBackTitleVisible: false,
    });
  }

  state = {
    name: '',
    email: '',
    password: '',
    errMsg: '',
  };

  async handleSubmit() {
    const {name, email, password} = this.state;

    if (!(name || email || password)) {
      this.setState({errMsg: 'Algum Campo em branco'});
      return;
    }

    const response = await api
      .post('/users', {
        name,
        email,
        password,
      })
      .then(res => {
        this.setState({token: res.data.token});

        this.props.navigation.navigate('Singnin', {email, password});
      })
      .catch(err => {
        this.setState({errMsg: err.response.data.error});
        console.warn(err.response.status, err.response.data.error);
      });
  }

  render() {
    const {errMsg} = this.state;
    const {navigation} = this.props;
    const emailRaf = createRef();
    const passwordRef = createRef();
    return (
      <Background>
        <Container>
          <Form>
            <FormInput
              icon="person-outline"
              value={this.state.name}
              onChangeText={text => {
                this.setState({name: text});
              }}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRaf.current.focus()}
            />
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
              ref={emailRaf}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <FormInput
              icon="lock-outline"
              value={this.state.password}
              onChangeText={text => {
                this.setState({password: text});
              }}
              secureTextEntry
              placeholder="Digite sua senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={this.handleSubmit}
            />

            {errMsg ? <ErroText>{errMsg}</ErroText> : <></>}

            <SubmitButton
              onPress={e => {
                this.handleSubmit(e);
              }}>
              Criar
            </SubmitButton>
          </Form>
          <SingLink
            onPress={() => {
              navigation.navigate('Singnin');
            }}>
            <SingLinkText>Já tenho uma conta</SingLinkText>
          </SingLink>
        </Container>
      </Background>
    );
  }
}
export default SingnUp;
