import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {Card} from '../../component';
import {storeData, retrieveData} from '../../utils';
import {SearchBar} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import axios from 'axios'
import { getAllEngineer } from '../../Redux/Actions/Data/Engineer/'
// import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

const Navbar = () => {
  return (
    <View>
      {/* App Bar */}
      <View
        flexDirection="row"
        style={{
          backgroundColor: 'white',
          padding: 10,
          height: 70,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 150, height: 100}}
          source={require('../../img/logoArkademy.png')}
        />
        <OcticonsIcon name="sign-out" size={30} color="#4F8EF7" />
      </View>

      {/* Search Bar */}
      <View>
        <SearchBar
          platform="default"
          lightTheme
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          round
          clearIcon
          searchIcon
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle={{backgroundColor: 'white'}}
        />
      </View>
    </View>
  );
};

export default Navbar;
