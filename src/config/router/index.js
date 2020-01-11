import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, Login, Register, Profile} from '../../pages';
const Router = createStackNavigator(
  {
    Home: {
      screen: Home,
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
  },
  {
    headerMode: 'None',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(Router);
