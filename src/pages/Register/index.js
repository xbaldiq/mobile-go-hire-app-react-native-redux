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
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, ThemeProvider, Button} from 'react-native-elements';

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
  

export default class Register extends Component {
  render() {
    return (
      <ThemeProvider>
          
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image
              style={{width: 400, height: 400, flex: 1}}
              source={require('../../img/loginPict1.svg')}
            />
            <Text styles={{flex: 1}}>Please Register</Text>
          </View>
          <View style={styles.form}>
            <View style={{width: 250}}>
              <Input placeholder="Username" />
            </View>
            <View style={{width: 250}}>
              <Input placeholder="Password" />
            </View>

            {/* Login Button */}
            <View style={{backgroundColor: '#FFF', marginTop: 30}}>
              <TouchableOpacity
                onPress={() => {
                //   alert('login!');
                  this.props.navigation.navigate('Home');
                }}>
                <Button
                  raised={true}
                  title="Register"
                  type="outline"
                  buttonStyle={{width: 250}}
                  onPress={() => {
                    // alert('Register Complete');
                    this.props.navigation.navigate('Login');
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => {
                alert('Login!');
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
