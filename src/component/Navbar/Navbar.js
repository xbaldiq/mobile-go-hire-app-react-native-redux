import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Card} from '../../component';
import {storeData, retrieveData} from '../../utils';
import {SearchBar} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import axios from 'axios';
import {getAllEngineer} from '../../Redux/Actions/Data/Engineer/';
// import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

export default class Navbar extends Component {

  // renderSearchBar = () => {
  //   if()
  // }

  render() {
    const {search, updateSearch, logoutAccount, userType} = this.props;

    console.log(this.props.search);

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
          <TouchableOpacity onPress={logoutAccount}>
            <OcticonsIcon name="sign-out" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {userType !== 'engineer' ? <View>
          <SearchBar
            platform="default"
            lightTheme
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            round
            clearIcon
            searchIcon
            containerStyle={{backgroundColor: 'white'}}
            inputContainerStyle={{backgroundColor: 'white'}}
          />
        </View> : ''}
      </View>
    );
  }
}
