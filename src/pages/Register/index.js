import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, ButtonGroup, Input, ThemeProvider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {registerAccount} from '../../Redux/Actions/Authorization';
import {loginAccount} from '../../Redux/Actions/Authorization';
import {storeData, retrieveData} from '../../utils';
import {connect} from 'react-redux';
import Axios from 'axios';
import {API_URL} from 'react-native-dotenv';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    flex: 1,
  },
  logo: {
    height: 200,
    width: '100%',
    // backgroundColor: 'pink',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    // height: 100,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

class Register extends Component {
  state = {
    role: 'company',
    selectedIndex: 0,
    user_type: 'engineer',
    username: '',
    password: '',
    registered: false,
  };

  // onClickSubmit = async () => {
  //   const username = this.state.username
  //   const password = this.state.password
  //   let url = API_URL.concat(`/register/${this.state.user_type}`)
  //   console.log(url)
  //   Axios.post(url ,{
  //     username,
  //     password
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: `Bearer `.concat(token),
  //     },
  //   }).then(res => {
  //       this.setState({registered: !this.state.registered});
  //       alert('register success');
  //       this.props.navigation.navigate('Login');
  //     })
  //     .catch(err => console.log('error: ',  err));
  // };

  onClickSubmit = async () => {
    console.log('register with: ',this.state.username, this.state.password, this.state.user_type)
    await this.props
      .dispatch(
        registerAccount({
          username: this.state.username,
          password: this.state.password,
          user_type: this.state.user_type,
        }),
      )
      .then(res => {
        this.setState({registered: !this.state.registered});
        alert('register success');
        this.props.navigation.navigate('Login');
      })
      .catch(err => alert('error'));
  };


  render() {
    const buttons = ['Engineer', 'Company'];

    return (
      <ThemeProvider>
        <View style={styles.container}>
          {/* Logo screen */}
          <LinearGradient colors={['#000000', '#311eaf']} style={styles.logo}>
            <Text h1 style={{color: 'white'}}>
              Please Register
            </Text>
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
              containerStyle={{height: 40, width: 350, marginTop: 20}}
            />

            {/* Register Button */}
            <View style={{backgroundColor: '#FFF', marginTop: 20}}>
              <TouchableOpacity>
                <Button
                  raised={true}
                  title="Register"
                  type="outline"
                  buttonStyle={{width: 350}}
                  onPress={e => {
                    this.onClickSubmit();
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => {
                // alert('Register!');
                this.props.navigation.navigate('Login');
              }}>
              <Text>Already Have Account? Login here.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps = state => ({
  // registerProps: state.registerReducer,                // ← Add this
})

export default connect(mapDispatchToProps)(Register)