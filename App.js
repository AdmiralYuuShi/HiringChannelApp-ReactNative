/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/public/redux/store';

// Import Screen
import Login from './src/screens/Login';
import MyProfile from './src/screens/MyProfile';
import Engineers from './src/screens/Engineers';
import Companies from './src/screens/Companies';
import DetailEngineer from './src/screens/DetailEngineer';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
      },
    },
    Engineers: {
      screen: Engineers,
      navigationOptions: {
        tabBarLabel: 'Engineers',
        tabBarIcon: ({tintColor}) => (
          <View>
            <FontAwesome5
              style={[{color: tintColor}]}
              size={20}
              name={'laptop-code'}
            />
          </View>
        ),
        activeColor: '#4267B2',
        inactiveColor: '#1A2947',
        barStyle: {backgroundColor: '#FFF'},
      },
    },
    Companies: {
      screen: Companies,
      navigationOptions: {
        tabBarLabel: 'Companies',
        tabBarIcon: ({tintColor}) => (
          <View>
            <FontAwesome5
              style={[{color: tintColor}]}
              size={20}
              name={'building'}
            />
          </View>
        ),
        activeColor: '#4267B2',
        inactiveColor: '#1A2947',
        barStyle: {backgroundColor: '#f0edf6'},
      },
    },
    About: {
      screen: MyProfile,
      navigationOptions: {
        tabBarLabel: 'My Profile',
        tabBarIcon: ({tintColor}) => (
          <View>
            <FontAwesome5
              style={[{color: tintColor}]}
              size={20}
              name={'patreon'}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'MyProfile',
    activeColor: '#f0edf6',
    inactiveColor: '#1A2947',
    barStyle: {backgroundColor: '#4267B2'},
  },
);

const StackNavigator = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  tab: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  detail: {
    screen: DetailEngineer,
  },
});

const Main = createAppContainer(StackNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
