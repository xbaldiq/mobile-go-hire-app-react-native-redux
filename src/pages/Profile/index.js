import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import HireIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
// import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class index extends Component {
  state = {
    profile: {},
  };

  componentDidMount = () => {
    this.setState({profile: this.props.navigation.state.params.profile});
  };

  render() {
    const {profile} = this.state;

    const arraySkill = 'Javascript, Phyton, PHP'.split(', ');

    return (
      <View
        flexDirection="column"
        height="100%"
        style={{backgroundColor: 'grey'}}>
        <View>
          <ImageBackground
            source={require('../../img/michael-afonso-Z_bTArFy6ks-unsplash.jpg')}
            style={{
              width: '100%',
              height: 350,
              resizeMode: 'cover',
            }}></ImageBackground>
        </View>

        <View
          style={{
            height: 300,
            marginTop: -20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            justifyContent: 'space-between',
          }}>
          {/* Content */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Name and Location */}
            <View>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {profile.name}
              </Text>
              <Text style={{fontSize: 20}}>{profile.description}</Text>
              <Text style={{color: 'grey'}}>{profile.location}</Text>
            </View>
            {/* Button Hire */}

            <Button
              icon={
                <HireIcon
                  name="account-plus"
                  size={15}
                  color="white"
                  style={{paddingRight: 10}}
                />
              }
              title="Hire"
              style={{minWidth: 40}}
            />

            {/* <HireIcon name="account-plus" size={30} color="#000" />
            <Text style={{}}>Hire?</Text> */}
          </View>

          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
            <Text style={{color: 'grey'}}>{profile.about}</Text>
          </View>

          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Skill
            </Text>

            <Text style={{color: 'black'}}>
              {profile.skill || 'Typescript, Web Assembly'}
            </Text>
          </View>
        </View>

        <View style={{height: 200, padding: 20}}></View>
        {/* <Text>{`Ini profile-nya ${profile.name}`}</Text> */}
      </View>
    );
  }
}
