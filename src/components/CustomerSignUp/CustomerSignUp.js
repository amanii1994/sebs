import React, {Component} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import * as urls from '../../constants/api';

const styles = require('./CustomerSignUpStyles');

export default class CustomerSignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errorMessage: ''
    };
    this.signUpCustomer = this.signUpCustomer.bind(this);
  }

  signUpCustomer = () => {
    this.setState({errorMessage: ''});
    if (this.state.email === '') {
      this.setState({errorMessage: "El campo de correo no puede estar vacío"})
    } else if (this.state.password != this.state.password_confirmation) {
      this.setState({errorMessage: "Las contraseñas no coinciden"})
    } else {
      signup_url = urls.BASE_URL + urls.SIGNUP_URI;
      fetch(signup_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "customer": {
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "password_confirmation": this.state.password_confirmation
          }
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              this.props.navigation.navigate('CustomerDashboard', {data});
            });
          } else if (response.status === 422) {
            this.setState({errorMessage: "Ya existe un usuario con ese correo electrónico"});
          }
        })
        .catch((error) => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={require("../../../assets/img/home_splash_3.jpg")}
      >
        <KeyboardAvoidingView
          behaviour='padding'
          style={styles.fullSize}
        >
          <View style={styles.logo_container}>
            <Image
              style={styles.logo_image}
              source={require('../../../assets/img/logo_blanco.png')}
            />
          </View>
          <View style={styles.customer_indicator}>
            <Text style={styles.customer_indicator_text}>
              Registro de Cliente
            </Text>
          </View>
          <View style={styles.agent_login_action}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AgentSignUp')}
            >
              <Text
                style={styles.agent_login_action_text}
              >
                Registrarse como agente
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.signup_container}
            keyboardShouldPersistTaps='never'
          >
            <View style={styles.signup_form_container}>
              <Text>
                {this.state.errorMessage}
              </Text>
              <View style={styles.input_container}>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(firstname) => this.setState({firstname})}
                    placeholder="NOMBRE"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(lastname) => this.setState({lastname})}
                    placeholder="APELLIDO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="envelope"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(email) => this.setState({email})}
                    placeholder="CORREO ELECTRÓNICO"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.signup_input_container_border}>
                  <FontAwesome
                    name="lock"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(password) => this.setState({password})}
                    placeholder="CONTRASEÑA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onFocus={() => {
                      this.setState({password: ""});
                    }}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.signup_input_container}>
                  <FontAwesome
                    name="lock"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.signup_input}
                    onChangeText={(password_confirmation) => this.setState({password_confirmation})}
                    placeholder="CONFIRMACIÓN DE CONTRASEÑA"
                    placeholderTextColor="#fff"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onFocus={() => {
                      this.setState({password_confirmation: ""});
                    }}
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.signUpCustomer}
              style={styles.signup_button}
            >
              <Text style={styles.signup_button_text}>
                REGISTRAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.back_button}
            >
              <Text style={styles.back_button_text}>
                REGRESAR
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
};