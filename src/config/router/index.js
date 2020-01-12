import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, HomeEngineer, Login, Register, Profile} from '../../pages';
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
  },
  {
    headerMode: 'None',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(Router);
