import React, {Component} from 'react';
import {View, Button, Image, Text, ImageBackground} from 'react-native';
import './CardOld';
import totalProjectIcon from '../../img/iconProject.png';
import successRateIcon from '../../img/iconSuccessRate.png';
// import successRate from './../img/iconSuccess.svg'

export default class Card extends Component {
  render() {

    const { name, description, skill, total_project, successrate } = this.props

    return (
      <View style={{padding: 5, borderRadius: 20, fontFamily: 'Roboto'}}>
        <ImageBackground
          imageStyle={{borderRadius: 20}}
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
              borderRadius: 20,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              fontFamily: 'Roboto',
              padding: 5,
            }}>

            {/* Name */}
            <Text style={{color: 'white', fontWeight: 'bold'}}>
            { name || 'Natalie Dormer'}
            </Text>

            {/* Description */}
            <Text style={{color: 'white', fontStyle: 'italic'}}>
            { description === 'mohon diisi' ?  'Backend Dev' : description}
            </Text>

            {/* Total Project */}
            <View style={{flexDirection: 'row'}}>
              <Image source={totalProjectIcon} style={{marginRight: 5}} />
              <Text style={{color: 'white', fontSize: 11}}>{ `${total_project} Project` || '0 Project' }</Text>
            </View>

            {/* Success Rate*/}
            <View style={{flexDirection: 'row'}}>
              <Image source={successRateIcon} style={{marginRight: 5}} />
              <Text style={{color: 'white', fontSize: 11}}>
              { `${successrate}% Success Rate` || '99% Success Rate' }
                
              </Text>
            </View>

            <View
              style={{
                width: '80%',
                borderWidth: 1,
                borderColor: 'white',
                marginVertical: 5,
              }}></View>
            <Text style={{color: 'white', textAlign: 'center'}}> { skill || 'Flutter, React Native, Swift, Ionic' }</Text>
          </View> 
        </ImageBackground>
      </View>
    );
  }
}
