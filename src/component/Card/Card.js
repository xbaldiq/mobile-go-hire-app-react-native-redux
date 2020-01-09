import React, {Component} from 'react';
import {View, Button, Image, Text, ImageBackground} from 'react-native';
import './CardOld';
import totalProjectIcon from '../../img/iconProject';
import successRateIcon from '../../img/iconSuccessRate';
// import successRate from './../img/iconSuccess.svg'

export default class Card extends Component {
  render() {
    return (
      <View style={{padding: 3, borderRadius: 20, fontFamily: 'Roboto'}}>
        {/* <Image
            source={require('../../img/michael-afonso-Z_bTArFy6ks-unsplash.jpg')}
            style={{
              flex: 1,
              resizeMode: 'cover',
              width: 150,
              height: 100,
              // alignSelf: 'stretch',
              // width: null,
            }}></Image> */}

        <ImageBackground
          style={{
            //   flex:1,
            width: 190,
            height: 250,
            resizeMode: 'cover',
            borderRadius: 20,
            justifyContent: 'flex-end',
          }}
          source={require('../../img/michael-afonso-Z_bTArFy6ks-unsplash.jpg')}>
          {/* Context */}
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              fontFamily: 'Roboto',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Natalie Dormer
            </Text>
            <Text style={{color: 'white', fontStyle: 'italic'}}>
              Fullstack Dev
            </Text>
            <Text style={{color: 'white', fontSize: 11}}>77 Project</Text>
            <Text style={{color: 'white', fontSize: 11}}>99% Success Rate</Text>
            <View
              style={{
                  width: '60%',
                borderWidth: 0.5,
                borderColor:'white',
              }}>
            </View>
            <Text style={{color: 'white'}}>Javascript, Redux </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
