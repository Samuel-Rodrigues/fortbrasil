import React, {Component} from 'react';
import Modal from 'react-native-modal';
import Form from '../../components/Form/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  stylesSheet,
  Avatar,
  ContainerCallout,
  TextCallout,
  AddressCallout,
} from './styles';
import checkAuth, {logOut} from '../../services/auth';
import MapView, {Marker, Callout} from 'react-native-maps';

import api from '../../services/api';
import {getToken} from '../../services/auth';

class Maps extends Component {
  async componentDidMount() {
    await this.getList();
    await this.authUser();
  }

  handleDelete = async id => {
    const token = await getToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api
      .delete(`/establishments/${id}`, {
        headers,
      })
      .then(async res => {
        console.log(res.data);
        await this.getList();
        this.toggleModal();
      });
    await this.getList();
  };

  async authUser() {
    const user = await checkAuth();
    if (!user) {
      this.props.navigation.navigate('Singnin');
    }
    this.setState({user: user});
  }

  async upload(establishment) {
    console.log('update', establishment);
    const token = await getToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.put(
      `/establishments/${establishment.id}`,
      establishment,
      {
        headers,
      },
    );

    await this.getList();
    this.toggleModal();
  }

  getList = async () => {
    this.setState({establishments: []});

    const token = await getToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await api.get('/establishments', {headers}).then(res => {
      const establishmentsList = res.data;
      this.setState({
        establishments: establishmentsList,
      });
    });
  };

  setCreate() {
    this.setState({isCreate: true});
    console.log('Setado true');
  }

  singnOut() {
    logOut();
    this.props.navigation.navigate('Singnin');
  }

  toggleModal = () => {
    if (this.state.isModalVisible === true) {
      this.setState({establishmentUpdate: null});
    }
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  state = {
    headers: '',
    isCreate: false,
    establishmentUpdate: null,
    establishments: [],
    apikey: 'AIzaSyC7rk__5hEwhpaGeAfPYNHJSDJ9lAPKW4c',
    initialRegion: {
      latitude: -3.7497319,
      longitude: -38.5513689,
    },
    isModalVisible: false,
  };

  render() {
    const {latitude, longitude} = this.state.initialRegion;
    const {apikey, establishments, establishmentUpdate} = this.state;

    return (
      <>
        <MapView
          style={stylesSheet.stylesMaps}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.092,
          }}>
          {establishments.map(establishment => {
            return (
              <Marker
                key={establishment.id}
                coordinate={{
                  latitude: Number(establishment.latitude),
                  longitude: Number(establishment.longitude),
                }}>
                <Avatar
                  source={{
                    uri:
                      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUSExQVFhIVFhYWGBcXFhkVGBUVGBgWFxgaFxgYHSggGhsmGxUYITEhJikrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslHSUvNzArLy0tLS0rLS0tLy8rLy0tLS0tLS0tKzcvKy0tNy0tKy0tLTItLSsrLSsuNystLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xABDEAABAgMFBQQGCAQFBQAAAAABAAIDESEEBRIxQQYiUWFxEzKBkSNCcqGxwQcUUmLC0eHwM1OCsiRDc5LxFmOio7P/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAtEQEAAgIBAwIEBAcAAAAAAAAAAQIDETESIUEEEzJRgfAiYcHhFDNCQ2KRsf/aAAwDAQACEQMRAD8A7iiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIi+XRAMyEH0i1n21g4noCsRtzj3WT6n8kG8ijjFjHUN8B+qwRobpTc4noSPmgmEUDDtLxk8+NfjNbDLxiahrvHD+aCWRR7L1Z6wIPLe+C2IdthuycPGnxQbCLwFeoCIiAiIgIiICIiAiIgIiICIiDxzgMzJYjaW8Z9ASvuKtcGZIylLLmEH19aJ7rZ+P5L5MR55dK/H8l8FgJIFSJTmZc14WOGsutfiUHroZObiV8OZDFTIdaLRtMKOe6+Y5DCoi0Wd4M3Az5qTLcV35TkW9oDfWnLgCfeo+NtIPUhucedPcJlRLoSsFhvCCAGiTSABUSr1U3tqaxH5oqJb7wf3GBg4y+blqWm6ra4YnxstMR+DaK5MjMOg6iqRwwtOSaZ69cQoY+vw8nY+Rk74yKf9RRmfxIJ6ibfjNWqLFhDgeg+a0LVeMNujR1qfJNL1b8I2FtRBOZc3qJ/Ca3IV6wn5PY7x+SrF8uZEfiYAKSNJTPTyUabK55o0uPAA/DNTqdPaiY3w6ALYBlNvsrZhXu4f5n+4D9+9UmxXJbTUYobeZ/CrFY7pcB6SLiPshvxViXK1deVhhXu4+q09HLYh3vCOcwek/7ZqC7BjMw0eNfJYo1ua0bszSdcuORWmVrh2uG7Jzek6+Szqhx7c8t4U04yV6hiQA5BEfSIiAiIgIiICIiAiIgxWgulRuLkCAfCai7BecGI94Y8Tk0FpoQRiBEj0Uyqjf1zwcc5bxJdTT9lZveKV3In2n0jxyYf7h8l7Ddvu9lvxcoO7rvtTG42RCZyk1+9uicuYzK8F/BkQiMwtkA3E2bmznPqFIyRMRM9tm05EibwbxaTTkR+aOayk6zMq1r8FqQ7XDiPaWPDt1+RrmzMZhZIrqs9sfArY8j3ex3qS5/8KPj3NwcPGilLREIY4gyOF3wK8bG5A/HzU01FphX3WSMyoxAcWr5iW+JLCZGeuoqrJDjh09JGVa6A6dV8xLK11SAedPkpprr3zCp4IsSgBPTL3L7hXA9x3iG9c1ZIlqhsoXN6DP3UWpEvYSGFuYB3q58k6T3J8NaBs3Cb3gX9afBbRECHJsmt4AAHIT0rooyPbXmdZClBQa8FqF+8PE+79VdMTaZ5StovFo7szUCuWYGSj7ZeDy11ZCRoKLWjRfiPioS9r+gQwWl03EUa2pPySZiO8onrTEkHdCtK22kBriSBQ500WrYHRrWzHD3GOmJmrgeegKq1psUVscttLnPwuk4E0lxAyyquV81aameJTa93Gw2tx7EhzWOaHunQTrIcTIHJdHVa2GsUOHCfglJzhlruj81ZV2UREQEREBERAREQEREHxHihrS45ATVas7DGi9TM8gtq/7ZM9mMhU9dAt65rJgZM951TyGgXhvPvZeiOI5Se7LeFoEKHTPJoUJdtjEV+8JtFTzPBfF6WsxIlO6KN58/FT932YQ4YBzzceakT72X/GE5lE37d0JrcQEnmjSKEc5hRN3ttk5YhEY0h28K0yGIfOa27wtRiPmMsmjl+qsN3WXs2Aamp6rePJbLlnU/hg8oC0Xu1rSIrXQyQRM1aTI5ELas0UOaCCCJDKui1L6itivlIYW0HM6le2DZpuHtAXMe6owkiQ0XSmfrvNYjsu23ANX+1+Fq17zdujqf7XKOtdtjWeIYcu2pidXC4ZACglkFgvHaGzmGMRLCDk8Eeq7UUK7xMTwo6IvlsXdb7Lf7Qq9F2gLqQYbnnid1v5lTEC44sRo7SIcJaKN3aS4iqTaI7DWtd7QWOLXPGIloDQZuJkdFr2uLaix0SFDq0E72o1kByVet1x/V4rmHMGYdqRmDNdG2etojQQ71xuvHMa+Oa81PUddppxKbc+ua0xHx2/WX4obqSya0nIy/eatu0ezcN0GcNoxw6iWo9YfPwULtJdHYxTIejfNzeXEeHzVr2Xt/awgHHfZunmND++C4Y7zaZxZOUVfY239lF7N3ciU6P0Pjl5KX20unE0R2jeZR3Nuh8PmozaK6eyizaJMfvN5HUeBVruO1iPB3quAwvHGmfiFnF+KJw258GvDF9G15gw3WZ3eaS5vNpzHgfirsuURID7JaQ5vqnE37zTofCYXULDamxYbYjcnCfTiF6PSZZmJpbmFhnREXrUREQEREBERAWvb7T2cNz+A/RbCxx4LXtLHVa4EHoVLb1OhXLqsxixMRq0bxOczopS/LZgZhHed7m6ry6rpFna4NcXYnTrTkFA3naSbS6G+YcSA06EGUui+batsGHUfFIkbgsmJ3aHJuXN36Lbv+2YW9mM3Z8m/qtyHghQ/utHmfzJVYe50WJ95x8v8AhTJPsYoxx8U/f7DfuGyYnYzk3Lm79FI31bMDJDvOoOQ1K2oEJsJgGjRU/Eqq260mI8u8AOWi3kn+HwxWPilGa6rJ2jwD3RU/krFeNsbBhuiOyaPM6BfF1WTs2AHvGp68PBUfb+/A6ILO07sOrub+HgPitVj2MO/6pOC5bcX2gvfUvNfGamr8umC5om0d78LlSbliAkngW/PJX221htOIy5jEZ4XazHvmu/pf5UfflUIyyw2AyAEgty5rVMdmcxUdNQtWK4SNNDU1/QKKgWktcHDMGa4+rvNL1tH5/okpbaq6+0h9o0b8P3t1Hhn5qA2dtnYxRPuO3XfI+CvdlitiMDhkR/yFT75uzsohAG46remo8Fx9THTMZqCyXzdwjQi31hvNPP8AXJVG6LQYEUO07rhy18QrZs7a8cPAe8ynVuh+Sjto7uwv7QDdfnyd+qeo/FWM9FS162ER4RAz7zTz081WLktBgxa0ad1w4c/AqwbN2qbezObcvZ/RRO1Zhwnh/wBudBxGamaeqtc9OfImNoLu7WHiA3mVHMaj5rDsReEnus85ggvH3SJA+cwt+57LGiQoQeCGuYCeMiMp8ZSWzs5s1CsmItJe91MRpJugC9HszbLXLXt8xNoiL2giIgIiICIiAiIgLSt1ka5zX4W425EicvHMLdWC1uk2cia6V9ykxEikbZ7QuglsIjAADEc+YIwgy8pmdeC2Nir4gxYkRs2mJDaw7pnuvLhOX9PvVd+lCGHndrjgRWgCpJABlLjyXGNm9oLRYowjQDheAWua4Ta5pza9v7IXl9mLZptPhZh+o7/ttBDbrV3TQLWuGx4n4z3W+936Li9y/SA+JGiPtMQMc8hzSAQwAADBKtKa8SuxbDbQw7TZGRGSlie10qbzXEVHMSPiuPs2v6jqvxHH6Ik9qr5bZbO6J6x3WDi45eWa4nEtRcS4mZJJJ4krN9JW24j2l0NgJZAc6GJ0Bc0kOPmFSX26NE1MuAoPNdcmK+W3yhHSNnY1HmsptqKy72clfGxw6ztkZ109ly5xsE0iC4HPEPxK9WbDgq0Z8x6rs5Z+K9GKvTXSsUV1HSrQ5adTooFkcGoIPSqnrS7cdwwmmQy4LhtpiRodrLobnNxRGA4TKYOEGY1XD1OD3dd+P2NO57LXjJ/ZONHZcnKwXtYe1hkesKt68PFcRvHbB1mtGBzMTRUOaZOG84ZGhyXX9mtpYdrssOOwHemKiVWktPvC54KW6JpeO08GtImwRTCeHDShHEahWG97VC7F5NQGF3kJiq5PtdtrCESOA8Ta5zRDaJYjoSeHNQ2zm2VttMrLEc3s4cGISQJOiSAa3GeWLTgufp8d8dLxbheZWyy7T4Y+hwQ3xCxprhEm1PGbhLorNbw2I9ocAQC2QzNZeWa5HsnAJtFsfI4aQ8UqTMVtJ8ZDJdcswxWhjRl2rQTpRw18Ml6PTY4puvgmHQwF6iL1oIiICIiAiIgIiICIiAsdo7q+yZVOSh4+0NlMQQGvD3vOGTd5o1qctEGved0wLQS2KwHdBDhuuaZkEhwroFz7av6NQ+bg3tfvtkyO0c9Ig966W1oDxKdWmmgkRl5rPNYtji3fysS/LV7bK2iDMs9KxueEEPZ7cPMdRMLzZy/LdZcX1aKYYf3hIEE5A4SO8OK/Sl63LAj1e2TxlEbuvH9Qz6FUHaTYI1dh7QfzIQAiD24eT+oqsdVq/F3j78L2lyaHZgSXOJc4kkk6k1JK3obFI2y4osMFwlEhj1mTp7bc2+K1obV0raLRuE06L9GFgbEhRScwWSnlXGrXabIWNyOZyGISwu1GXjJV76KXAMjCeZhy5/xFbb9Po/6vwuSvH38yVetR3HTpumgqcuOQ965G+FO1D/UZ8WrqtrfuO6Ee5c3hw/8AFM/1WfELN+fpJCL2rgB0YzGn4nLY2MvS1wojLNDjEWd7nOcyQ+w4mRlMAyE17f7fSn96lebLQ/8AFM5NiH/1u/NY/s/RfKr7Qk/WIvtfIKW+j8HtoztBZ3+ZcwBYL3aDFiT+0VMbAWcTtRH8uEP90UD5Jk7Yv9Ecum2a74cLC0jtHtl3hKGw/dhihP3nT6KXuh07TD9ufkCVHWl3pXe2fcVgF7ts72RDOUyDKpqCK+a61rFY1Cb26uHL1VW6NpYUUbjweWvkrDZ7TiWkbKIiAiIgIiICIiAiIg1byszokNzA4txCUxmFz+8LsfBeHvHZvaZtjMbuE/8AcYMjzHkV0pY40FrhJwBBQUeHtM5hZ9YhnUdoyRY5p9YccsgrLZbUyI0PY4OadQom89mS2ZgyLTV0J1WO6fZPMKtwoEWE8mAXMiawXZn2dHj39UVfkmoC6dpYcTcijs4mVe6T45HkVOzREbedxwYxxSLIv8xm67x0cOqpF+7Hls3OZT+dBb/9IXzaukTSa52xxM7jtKxKlfRzZQwR2EtePRmYqCN/jkVYL6hSh94gTyIxVwuyJOXmt1llYwuexjWufLFISxSnwpOucloX9GHZ1ocWRz7rsuPgtUiYjUkq5aAAx0vsmpqcuOngqrd1zF0QRBNzgQ8MZpKoMR5o0UyVmtD906CWuZ8NF46MZBok1gya0Sb5anmVm9Jt5Ilza+h6QrLskz/EHlBin/xl818Xx/EctrY9vpYx4WeJ7y0LF+2H6LHKr3l/Ef7TvirT9HtnPZxnkENfFs7ATQGTnEyOsqTWWzXBAY4vikRnklwYJiG2ZnvnN55CQ6qULYkSpIaxtPssYOAAy6ALMzOSOmvHzXhJ269WNiE96bnGnOcqqNjsfGIDwRq2G2rzwJ+z1PkpW5NnokYjsmlrf5rhU+w3TquhXHsvBgCcpuObjUk9V6WVW2X2UeHCI5oYAKNGdZd46mi6BZrNhCztYAvpEEREBERAREQEREBERAREQFH3pdEKM2ThXQ5EdCpBEFBvi5Ht/iAxGDKK0ekaPvfbHXzWpY7wj2YAzEWBlOeXKebTyK6Q5oOagby2fBJfBOB5zHqu5ObkUGO77yhRhNhrq00cPD5rbmqba7vLX0HYxp0qQx3su9XoadFvWLaBzD2doaQR60v7h8wirG5w8yovaGIRCp9r5OUkx7XtmJOaZcwVE7QwpQu9Js9Ri0ORnl1RFTjuoV4XJFkAZZ8Tmfy8Fhe9BX4l0Ne8xIr5MJo1tXul7mjmfJb8KGcPZwmhjD6jal3tHNxW02ztaMTjhaeU3P8AZGZ+Cn7n2ajR6kGDAOn+Y8feOg5LhXFv4u//ABrav2SwFzsDW9pE+w3ut9t/yHmrxcexgmIloOJwyYKMZyAVkuq54NnaGw2gfE9SpBd9MscGC1okBILIiICIiAiIgIiICIiAiIgIiICIiAiIgIiINa2WKHEGF4BCrF53G9gkB2sIZNPfZ7DtOnuVwXhCDnVjdEgFzoXpGesw0c2XFv4hMLYva9oUWBQydiE2nPI5cVaLyuRkTebNkQZObQzVSvqwOh1fBe50wAYQG+To4eqeY8kVAhrnzAEgKkmkhzOQCzWGzviuw2doiOnWIR6NnQHvHr5FTt2bJxo0jafRwhUQWZf1nU/uiu1isUOE0NY0NA0AkggLi2Shwj2sU9rGObnVl0GiszWgZL1EQREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=',
                  }}
                />

                <Callout
                  onPress={() => {
                    this.setState({
                      establishmentUpdate: establishment,
                      isCreate: false,
                    });

                    this.toggleModal();
                  }}>
                  <ContainerCallout>
                    <TextCallout>{establishment.name}</TextCallout>

                    <AddressCallout>
                      {establishment.street}, {establishment.number}
                    </AddressCallout>
                  </ContainerCallout>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <View style={stylesSheet.searForm}>
          <TouchableOpacity
            style={stylesSheet.addButton}
            onPress={() => {
              this.setCreate();

              this.toggleModal();
            }}>
            <Icon name="add-location" size={30} />
            <TextCallout>Adicionar estabelecimento </TextCallout>
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesSheet.logoffButton}
            onPress={() => this.singnOut()}>
            <Icon name="exit-to-app" size={26} />
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible}>
          <View>
            <Form
              delete={this.handleDelete}
              upload={this.upload}
              isCreate={this.state.isCreate}
              itemUpdate={establishmentUpdate}
              getList={this.getList}
              getCoordenate={this.getCoordenateByAddress}
              apikey={apikey}
              toggleModal={() => this.toggleModal()}
            />
          </View>
        </Modal>
      </>
    );
  }
}

export default Maps;
