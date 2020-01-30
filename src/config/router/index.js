import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  Home,
  HomeEngineer,
  Login,
  Profile,
  Register,
  ProjectPage,
} from '../../pages';

const Router = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    HomeEngineer: {
      screen: HomeEngineer,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Profile: {
      screen: Profile,
    },
    ProjectPage: {
      screen: ProjectPage,
    },
  },
  {
    headerMode: 'None',
    initialRouteName: 'Home',
  },
);

export const welcomeScreen = () => {
  return (
    <View>
      <Text>Ini welcomescreen</Text>
    </View>
  );
};

export const dashboard = () => {
  return (
    <View>
      <Text>Ini dashboard</Text>
    </View>
  );
};

const AppSwitchNavigator = createSwitchNavigator({
  welcome: {screen: welcomeScreen},
  dashboard: {screen: dashboard},
});

export default createAppContainer(Router);
