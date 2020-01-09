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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, ThemeProvider, Button, ButtonGroup} from 'react-native-elements';
import img1 from '../../img/loginPict1.svg';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // alignContent: 'center',
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

export default class Login extends Component {
  state = {
    role: 'company',
    selectedIndex: 0,
  };

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  render() {
    const buttons = ['Company', 'Engineer'];
    const { selectedIndex } = this.state;

    return (
      <ThemeProvider>
        {/* <ScrollView style={styles.scrollView}> */}
        <View style={styles.container}>
          {/* Logo screen */}

          <LinearGradient colors={['#95008f', '#000000']} style={styles.logo}>
            {/* <Image
              style={{width: 400, height: 400, flex: 1}}
              source={require('../../img/loginPict1.svg')}
            /> */}

            <Text h1 style={{color: 'white'}}>
              Please Login
            </Text>
            {/* <Text styles={{flex: 1}}>Please login</Text> */}
          </LinearGradient>

          {/* Form */}
          <View style={styles.form}>
            <View style={{width: 350}}>
              <Input placeholder="Username" />
            </View>
            <View style={{width: 350}}>
              <Input placeholder="Password" />
            </View>

            {/* Role Selector */}
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              // style={{}}
              containerStyle={{height: 40, width: 350, marginTop: 20}}
            />

            {/* <Picker
              placeholder="role"
              selectedValue={'ggwp'}
              style={{height: 50, width: 200}}
              //   onValueChange={(itemValue, itemIndex) =>
              //     this.setState({role: itemValue})
              //   }
            >
              <Picker.Item label="Engineer" value="java" />
              <Picker.Item label="Company" value="js" />
            </Picker> */}

            {/* Login Button */}
            <View style={{backgroundColor: '#FFF', marginTop: 20}}>
              <TouchableOpacity>
                <Button
                  raised={true}
                  title="Login"
                  type="outline"
                  buttonStyle={{width: 350}}
                  onPress={() => {
                    // alert('login!');
                    this.props.navigation.navigate('Home');
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
        {/* </ScrollView> */}
      </ThemeProvider>
    );
  }
}
