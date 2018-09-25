import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
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

import * as urls from '../../../constants/api';

const styles = require('./CustomerLoginStyles');

export default class CustomerLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.signInUser = this.signInCustomer.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params != null) {
      this.setState({errorMessage: this.props.navigation.state.params.data.agent.data.attributes.recover_password_text})
    }
  }

  signInCustomer = () => {
    this.setState({ errorMessage: '' });
    if (this.state.email === '') {
      this.setState({ errorMessage: "El campo de correo no puede estar vacío" })
    } else if (this.state.password === '') {
      this.setState({ errorMessage: "Por favor ingrese su contraseña" })
    } else {
      signinURL = urls.BASE_URL + urls.CUSTOMER_SIGNIN;
      fetch(signinURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "customer": {
            "email": this.state.email,
            "password": this.state.password,
          }
        }),
      }).then((response) => {
        if (response.status === 401) {
          this.setState({ errorMessage: <Text style={styles.text_error}>Verifique su usuario y su contraseña</Text> });
          return response;
        } else {
          response.json().then((data) => {
            this.props.navigation.navigate('CustomerDashboard', { data: data });
          });
        }
      }).catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.image_background}
        source={require("../../../../assets/img/home_splash_2.jpg")}
      >
        <KeyboardAvoidingView
          style={styles.fullSize}
          behavior="padding"
        >
          <View style={styles.customer_indicator}>
            <Text style={styles.customer_indicator_text}>
              CLIENTE
            </Text>
          </View>
          <View style={styles.agent_login_action}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AgentLogin')}
            >
              <Text
                style={styles.agent_login_action_text}
              >
                Entrar como agente
              </Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.logo_image} source={require('../../../../assets/img/logo_blanco.png')} />
          <ScrollView
            contentContainerStyle={styles.login_container}
            keyboardShouldPersistTaps='never'
            scrollEnabled={false}
          >
            <View style={styles.login_form_container}>
              <Text>
                {this.state.errorMessage}
              </Text>
              <View style={styles.input_container}>
                <View style={styles.input_container_user}>
                  <FontAwesome
                    name="user"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.login_input}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder="CORREO ELECTRÓNICO"
                    placeholderTextColor='#fff'
                    autoCapitalize="none"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.input_container_password}>
                  <FontAwesome
                    name="lock"
                    size={32}
                    color='#fff'
                  />
                  <TextInput
                    style={styles.login_input}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder="CONTRASEÑA"
                    placeholderTextColor='#fff'
                    autoCapitalize="none"
                    onFocus={() => this.setState({ password: "" })}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={this.signInCustomer}
                style={styles.login_button}
              >
                <Text style={styles.login_button_text}>
                  Entrar
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
            </View>
            <View style={styles.login_actions_container}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerSignUp')}>
                <Text style={styles.sign_up_button}>
                  ¿NO TIENE UNA CUENTA?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerResetPassword')}>
                <Text style={styles.sign_up_button}>
                  ¿OLVIDÓ SU CONTRASEÑA?
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}