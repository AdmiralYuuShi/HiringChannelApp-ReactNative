import React from 'react';
import {View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screen
import MyProfile from './src/screens/MyProfile';
import Engineers from './src/screens/Engineers';
import Companies from './src/screens/Companies';

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
        activeColor: '#f60c0d',
        inactiveColor: '#f65a22',
        barStyle: {backgroundColor: '#f69b31'},
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
        activeColor: '#615af6',
        inactiveColor: '#46f6d7',
        barStyle: {backgroundColor: '#67baf6'},
      },
    },
  },
  {
    initialRouteName: 'MyProfile',
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: {backgroundColor: '#3BAD87'},
  },
);

export default createAppContainer(TabNavigator);
