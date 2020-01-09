import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Home, Login, Register} from '../../pages';
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
  },
  {
    headerMode: 'None',
    initialRouteName: 'Login',
  },
);

export default createAppContainer(Router);
