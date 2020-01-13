import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Picker,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, ThemeProvider, Button, ButtonGroup} from 'react-native-elements';
import img1 from '../../img/loginPict1.svg';
import LinearGradient from 'react-native-linear-gradient';
import {API_URL} from 'react-native-dotenv';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {storeData, retrieveData} from '../../utils';
import {loginAccount} from '../../Redux/Actions/Authorization';
import logoGoHire from '../../img/gohirelogo.png'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    paddingTop: 30,
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  logo: {
    height: 200,
    width: '100%',
    // backgroundColor: 'pink',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomRightRadius: 20
  },
  form: {
    borderTopLeftRadius: 20,
    // height: 100,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 30,
    flex: 2.5,
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#FFF',
    height: 50,
    justifyContent: 'center',
    // alignSelf: 'center',
    // marginVertical: 5,
  },
});

class Login extends Component {

  componentDidMount = async () => {
    if (await retrieveData('token')) {
      this.props.navigation.navigate('Home');
    }
  }

  componentDidUpdate = async (prevState) => {
    // Trigger login button
    // if (await retrieveData('token')) {
    //   this.props.navigation.navigate('Home');
    // }
  }

  state = {
    role: 'company',
    selectedIndex: 0,
    user_type: 'engineer',
    username: '',
    password: '',
  };

  onClickSubmit = async () => {
    await this.props
      .dispatch(
        loginAccount({
          username: this.state.username,
          password: this.state.password,
          user_type: this.state.user_type,
        }),
      )
      .then(res => {
        storeData('token', res.value.data.data[0].token);
        storeData('userID', res.value.data.data[0].id);
        storeData('username', res.value.data.data[0].username);
        storeData('name', res.value.data.data[0].name);
        storeData('user_type', res.value.data.data[0].user_type);
        this.setState({user_type: res.value.data.data[0].user_type}, this.redirectToHome)
        ;
        // console.log(res.value.data.data[0]);
      })
      .catch(err => alert('error'));
  };

  redirectToHome = () => {
    if(this.state.user_type === 'company')
    this.props.navigation.navigate('Home');
    else
    this.props.navigation.navigate('HomeEngineer');
  }

  render() {
    const buttons = ['Engineer', 'Company'];

    return (
      <ThemeProvider>
        <View style={styles.container}>
          {/* Logo screen */}
          <LinearGradient colors={['#FFF', '#FFF']} style={styles.logo}>
          {/* <LinearGradient colors={['#FFF', '#000000']} style={styles.logo}> */}
            {/* <Text h1 style={{color: 'white', fontSize: 20}}>
             Go Hire App
            </Text> */}
            <Image
            style={{paddingTop:30, width: 200}}
            source={require('../../img/logoHire1.png')}
          />
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <View style={{width: 350}}>
              <Input
                onChangeText={username => this.setState({username})}
                placeholder="Username"
                id="username"
                value={this.state.username}
              />
            </View>
            <View style={{width: 350}}>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                id="password"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            </View>

            {/* Role Selector */}
            <ButtonGroup
              onPress={selectedIndex => {
                this.setState({selectedIndex});
                if (selectedIndex === 0) {
                  this.setState({user_type: 'engineer'});
                } else if (selectedIndex === 1) {
                  this.setState({user_type: 'company'});
                }
              }}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              // style={{}}
              containerStyle={{height: 40, width: 350, marginTop: 20}}
            />

            {/* Login Button */}
            <View style={{backgroundColor: '#FFF', marginTop: 20}}>
              <TouchableOpacity>
                <Button
                  raised={true}
                  title="Login"
                  type="outline"
                  buttonStyle={{width: 350}}
                  onPress={e => {
                    this.onClickSubmit(e);
                    // alert('login!');
                    // this.props.navigation.navigate('Home');
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => {
                // alert('Register!');
                this.props.navigation.navigate('Register');
              }}>
              <Text>Dont have an account? Sign Up here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginProps: state.loginReducer,
  };
};

export default connect(mapStateToProps)(Login);
