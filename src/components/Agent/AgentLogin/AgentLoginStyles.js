const React = require('react-native');
const {Dimensions, StyleSheet} = React;

module.exports = StyleSheet.create({
  fullSize: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  image_background: {
    flex: 1,
  },
  agent_indicator: {
    backgroundColor: '#0069A7',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 70,
    right: 0,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  agent_indicator_text: {
    color: '#fff',
    fontSize: 20
  },
  customer_login_action: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    top: 100,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 15,
    zIndex: 1
  },
  customer_login_action_text: {
    color: '#fff',
    fontSize: 18
  },
  login_container: {
    flex: 1,
    top: 270,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  login_form_container: {
    flex: 1,
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_actions_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  input_container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5
  },
  input_container_user: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 20
  },
  input_container_password: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  login_input: {
    width: 200,
    height: 40,
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    color: '#fff',
    paddingLeft: 10
  },
  login_button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_button_text: {
    color: '#0069A7',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 10
  },
  back_button: {
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 10
  },
  sign_up_button: {
    color: "#fff",
    width: 170,
    height: 20,
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  logo_image: {
    width: 95,
    height: 85,
    top: 60,
    right: 140
  },
  text_error: {
    color: 'white'
  }
});