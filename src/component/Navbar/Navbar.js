import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

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
            height: 60,
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottomWidth: 3,
            borderBottomColor: '#9AD0FF'

          }}>
          <TouchableOpacity onPress={openDrawer}>
            <Avatar.Image
              size={50}
              source={{
                uri:
                  'https://www.thewrap.com/wp-content/uploads/2019/11/The-Witcher.png',
              }}
            />
          </TouchableOpacity>
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
