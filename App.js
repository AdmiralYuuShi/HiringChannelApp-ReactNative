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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from 'react-navigation-stack';
import {store, persistor} from './src/public/redux/store';

// Import Screen
import Login from './src/screens/Login';
import DetailEngineer from './src/screens/DetailEngineer';
import DetailCompany from './src/screens/DetailCompany';
import EditEngineer from './src/screens/EditEngineer';
import CreateEngineerProfile from './src/screens/CreateEngineerProfile';
import EditCompany from './src/screens/EditCompany';
import TabNavigator from './src/components/TabNavigator';
import CreateCompanyProfile from './src/screens/CreateCompanyProfile';

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
  detailEngineer: {
    screen: DetailEngineer,
  },
  detailCompany: {
    screen: DetailCompany,
  },
  editEngineer: {
    screen: EditEngineer,
  },
  editCompany: {
    screen: EditCompany,
  },
  createEngineerProfile: {
    screen: CreateEngineerProfile,
  },
  createCompanyProfile: {
    screen: CreateCompanyProfile,
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
