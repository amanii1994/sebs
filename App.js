import React from 'react';
import {StyleSheet, Text, View,AppRegistry, AsyncStorage} from 'react-native';
import {SwitchNavigator, TabNavigator, TabBarBottom,StackNavigator} from 'react-navigation';

import Home from './src/components/Home/Home';
import CustomerLogin from './src/components/CustomerLogin/CustomerLogin';
import AgentLogin from './src/components/AgentLogin/AgentLogin';
import CustomerSignUp from './src/components/CustomerSignUp/CustomerSignUp';
import AgentSignUp from './src/components/AgentSignup/AgentSignUp';
import CustomerDashboard from './src/components/CustomerDashboard/CustomerDashboard';
// import AgentDashboard from './src/components/AgentDashboard/AgentDashboard';
import CustomerResetPassword from './src/components/CustomerResetPassword/CustomerResetPassword';
import AgentResetPassword from './src/components/AgentResetPassword/AgentResetPassword';
import CustomerProfile from './src/components/CustomerProfile/CustomerProfile';
import CustomerJobs from './src/components/CustomerJobs/CustomerJobs';
import CustomerAddress from './src/components/CustomerAddress/CustomerAddress';
import CustomerDateTime from './src/components/CustomerDateTime/CustomerDateTime';
import CustomerBaseService from './src/components/CustomerBaseService/CustomerBaseService';
import CustomerServiceType from './src/components/CustomerServiceType/CustomerServiceType';
import CustomerAddonService from './src/components/CustomerAddonService/CustomerAddonService';
import CustomerNewAddress from './src/components/CustomerNewAddress/CustomerNewAddress';
import CreateJob from "./src/components/CreateJob/CreateJob";

import AgentJobListScreen from "./src/components/AgentJobListScreen/AgentJobListScreen";
import AgentJobDetailScreen from "./src/components/AgentJobDetailScreen/AgentJobDetailScreen";
import AgentJobCommentScreen from "./src/components/AgentJobCommentScreen/AgentJobCommentScreen";

import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

import * as globals from './src/util/globals';
// Don't show warnings about deprecation lifecycle methods on the App
import {YellowBox} from 'react-native';

// Redux Store
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/reducers';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
]);

//======================================================================
// AgentDashboard StackNavigator
//======================================================================

const AgentDashboard = StackNavigator({
  AgentJobListScreen : { screen :AgentJobListScreen},
  AgentJobDetailScreen : { screen :AgentJobDetailScreen},
  AgentJobCommentScreen : { screen :AgentJobCommentScreen},
},{
  navigationOptions:{
    header : null
  }
})

const iconHeight = 20;
const AgentTabar = TabNavigator({
  AgentDashboard: {
      screen: AgentDashboard,
      navigationOptions: {
          borderBottomWidth: 0,
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
              <View style={[styles.tabViewBox]}>
                  <Entypo name="home" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
                  <Text style={[styles.tabText, { color: tintColor }]}>{"Home"}</Text>
              </View>
          )
      }
  },
  AgentDashboards: {
    screen: AgentDashboard,
    navigationOptions: {
        borderBottomWidth: 0,
        tabBarLabel: 'Trabajos',
        tabBarIcon: ({ tintColor }) => (
            <View style={[styles.tabViewBox]}>
                <Foundation name="shopping-bag" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
                <Text style={[styles.tabText, { color: tintColor }]}>{"Trabajos"}</Text>
            </View>
        )
    }
},
AgentDashboardd: {
  screen: AgentDashboard,
  navigationOptions: {
      borderBottomWidth: 0,
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ tintColor }) => (
          <View style={[styles.tabViewBox]}>
              <Entypo name="user" style={[styles.tabIcon]} size={iconHeight} color={tintColor} />
              <Text style={[styles.tabText, { color: tintColor }]}>{"Perfil"}</Text>
          </View>
      )
  }
},
},{
  tabBarOptions: {
      activeTintColor: '#1e67a9',
      inactiveTintColor: 'gray',
      style: {
          backgroundColor: '#FFF',
          height: 49,
          borderTopColor: 'transparent',
          borderTopWidth: 1,
          paddingRight: 10,
          paddingLeft: 10,
          borderTopWidth: 1,
          borderTopColor: 'gray'
      },
      showLabel: false,
      showIcon : true,
  },
  tabBarComponent : TabBarBottom,
  initialRouteName: 'AgentDashboard',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
}, []);


const MainNavigator = SwitchNavigator({
  Home: {screen: Home},
  CustomerLogin: {screen: CustomerLogin},
  AgentLogin: {screen: AgentLogin},
  CustomerSignUp: {screen: CustomerSignUp},
  AgentSignUp: {screen: AgentSignUp},
  CustomerDashboard: {screen: CustomerDashboard},
  // AgentDashboard: {screen: AgentDashboard},
  AgentTabar : { screen :AgentTabar},
  CustomerResetPassword: {screen: CustomerResetPassword},
  AgentResetPassword: {screen: AgentResetPassword},
  CustomerProfile: {screen: CustomerProfile},
  CustomerJobs: {screen: CustomerJobs},
  CreateJob: {screen: CreateJob},
  CustomerAddress: {screen: CustomerAddress},
  CustomerDateTime: {screen: CustomerDateTime},
  CustomerBaseService: {screen: CustomerBaseService},
  CustomerAddonService: {screen: CustomerAddonService},
  CustomerServiceType: {screen: CustomerServiceType},
  CustomerNewAddress: {screen: CustomerNewAddress},
  initialRouteName: 'Home',
});



export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fontLoaded: false,
      isLoading : true
    };
  }

  async componentWillMount() {
    AsyncStorage.getItem("access_token").then((value)=>{
      if(value != null && value != undefined){
        globals.access_token = value
      }
      this.setState({isLoading : true,fontLoaded: true})
    })
    await Expo.Font.loadAsync({
      'helvetica': require('./assets/fonts/HELR45W.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  
  render() {
    if(this.state.fontLoaded){
      return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
      );
    }else{
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 10,
    fontWeight: "600",
    flex: 4,
  },
  tabViewBox: {
      flex: 1,
      alignItems: "center",
  },
  tabIcon: {
    flex: 5,
    alignSelf: "center",
    marginTop: 7,
    marginBottom: 5
  },
});
