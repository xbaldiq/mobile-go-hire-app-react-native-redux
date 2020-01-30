import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ButtonGroup,} from 'react-native-elements';
import {Button, Image, Text, Input, ThemeProvider} from 'react-native-paper';
import {connect} from 'react-redux';
import {loginAccount} from '../../Redux/Actions/Authorization';
import {retrieveData, storeData} from '../../utils';

class Login extends Component {
    render() {
        return (
            <View>
                <Text>Hello world</Text>
            </View>
        )
    }
}

export default Login