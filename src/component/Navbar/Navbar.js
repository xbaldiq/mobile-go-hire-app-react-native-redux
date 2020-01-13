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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
// import { Avatar } from 'react-native-elements';

export default class Navbar extends Component {

  render() {
    const {search, updateSearch, logoutAccount, userType, openDrawer} = this.props;
    console.log(this.props.search);

    return (
      <View>
        {/* App Bar */}

        <View
          flexDirection="row"
          style={{
            backgroundColor: 'white',
            padding: 5,
            height: 70,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={openDrawer}>
            <Avatar.Image
              size={40}
              source={{
                uri:
                  'https://www.thewrap.com/wp-content/uploads/2019/11/The-Witcher.png',
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <MaterialCommunityIcons
              name="account-circle"
              size={35}
              color="#000"
            />
          </TouchableOpacity> */}

          <Image
            style={{width: 150, height: 100}}
            source={require('../../img/logoHire2.png')}
          />
          <TouchableOpacity onPress={logoutAccount}>
            <OcticonsIcon name="sign-out" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {userType !== 'engineer' ? (
          <View>
            <SearchBar
              platform="default"
              lightTheme
              placeholder="Search Here..."
              onChangeText={updateSearch}
              value={search}
              round
              clearIcon
              searchIcon
              containerStyle={{backgroundColor: 'white'}}
              inputContainerStyle={{backgroundColor: 'white'}}
            />
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}
