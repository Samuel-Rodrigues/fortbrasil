import React, {Component} from 'react';
import {
  Container,
  TInput,
  ErrorText,
  SuccessText,
  Header,
  TextHeader,
  IButton,
  EditButton,
  RemoveButton,
  CloseModal,
} from './styles';
import api from '../../services/api';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, TouchableOpacity} from 'react-native';
import {withFormik} from 'formik';

class Form extends Component {
  constructor(props) {
    super(props);

    if (this.props.itemUpdate) {
      const {id, name, street, number, burgh, city} = this.props.itemUpdate;
      this.props.values.id = id;
      this.props.values.name = name;
      this.props.values.street = street;
      this.props.values.number = String(number);
      this.props.values.burgh = burgh;
      this.props.values.city = city;

      console.log(this.props.isCreate);
    }

    if (this.props.isCreate) {
      console.log(this.props.isCreate);
      this.setState({isCreate: true});
    }
  }

  state = {
    isCreate: null,
    isSubmitting: false,
    msgSuccess: false,
    msgError: '',
  };

  closeModal() {
    this.props.itemUpdate = '';
    this.setState({
      isSubmitting: false,
      msgSuccess: false,
      msgError: '',
    });
    this.props.toggleModal();
  }

  delete() {
    this.props.delete(this.props.itemUpdate);
  }

  handleUpdate() {
    this.setState({isSubmitting: true, msgSuccess: false, msgError: ''});
    var {id, name, street, city, number, burgh} = this.props.values;
    if (!name || !street || !city || !number || !burgh) {
      this.setState({
        msgError: 'Existe um campo vazio',
        isSubmitting: false,
      });
      return;
    }
    var establishment = {};
    establishment = {
      id,
      name,
      street,
      number,
      burgh,
      city,
    };

    this.props.upload(establishment);
  }

  async handleAdd() {
    this.setState({isSubmitting: true, msgSuccess: false, msgError: ''});
    var {name, street, city, number, burgh} = this.props.values;

    var establishment = {};
    Geocoder.init(this.props.apikey, {language: 'pt'});
    Geocoder.from(`${street}, ${number} - ${burgh} ${city}`)
      .then(async json => {
        var location = json.results[0].geometry.location;
        this.props.values.location = location;

        establishment = {
          name,
          street,
          number,
          burgh,
          city,
          latitude: location.lat,
          longitude: location.lng,
        };

        this.props.add(establishment);
        this.setState({msgSuccess: true, isSubmitting: false});
      })
      .catch(err => {
        this.props.values.error = 'Endereço não existe';
        this.setState({
          msgError: 'Endereço não existe',
          isSubmitting: false,
        });
        return;
      });

    this.setState({isSubmitting: false});
    this.props.toggleModal();
  }

  render() {
    const {isSubmitting, msgSuccess, msgError, isCreate} = this.state;
    return (
      <Container>
        <Header>
          {this.props.isCreate ? (
            <TextHeader>Cadastro de estabelecimento</TextHeader>
          ) : (
            <TextHeader>Edição de estabelecimento</TextHeader>
          )}
        </Header>
        <TInput
          value={this.props.values.name}
          placeholder="Nome do estabelecimento"
          onChangeText={text => this.props.setFieldValue('name', text)}
        />
        <TInput
          value={this.props.values.street}
          placeholder="Rua"
          onChangeText={text => this.props.setFieldValue('street', text)}
        />
        <TInput
          value={this.props.values.number}
          placeholder="Número"
          onChangeText={text => this.props.setFieldValue('number', text)}
        />
        <TInput
          value={this.props.values.burgh}
          placeholder="Bairro"
          onChangeText={text => this.props.setFieldValue('burgh', text)}
        />
        <TInput
          value={this.props.values.city}
          placeholder="Cidade"
          onChangeText={text => this.props.setFieldValue('city', text)}
        />

        {msgSuccess ? <SuccessText>Estabelecimento criado</SuccessText> : <></>}
        {msgError ? <ErrorText>{msgError}</ErrorText> : <></>}

        {this.props.isCreate ? (
          <IButton loading={isSubmitting} onPress={() => this.handleAdd()}>
            Salvar
          </IButton>
        ) : (
          <>
            <EditButton
              loading={isSubmitting}
              onPress={() => this.handleUpdate()}>
              Editar
            </EditButton>
            <RemoveButton loading={isSubmitting} onPress={() => this.delete()}>
              Delete
            </RemoveButton>
          </>
        )}

        <CloseModal onPress={() => this.closeModal()}>Fechar</CloseModal>
      </Container>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    id: '',
    name: '',
    street: '',
    number: '',
    burgh: '',
    city: '',
  }),
  values: {},
})(Form);
