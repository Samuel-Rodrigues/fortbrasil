import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';

function ListEstablishments({establishment}) {
  console.log('Entrou aqui:', establishment);
  return (
    <>
      <Text>Oiii</Text>
      <View>
        {establishment[0].map(item => (
          <Text>{item.name} </Text>
        ))}
      </View>
    </>
  );
}

export default connect(state => ({
  establishment: state.establishment,
}))(ListEstablishments);
