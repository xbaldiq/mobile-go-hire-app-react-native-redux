import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import HireIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List, ListItem} from 'react-native-elements';
// import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import {assignProject} from '../../axios/axios';

export default class index extends Component {
  state = {
    assignProjectList: [],
    profile: {},
    modalVisible: false,
  };

  componentDidMount = () => {
    this.setState({profile: this.props.navigation.state.params.profile});
    this.setState({
      assignProjectList: this.props.navigation.state.params.assignProjectList,
    });
    this.setState({id_company: this.props.navigation.state.params.id_company});
    this.setState({id_engineer: this.props.navigation.state.params.id});
    this.setState({token: this.props.navigation.state.params.token});
  };

  listHiringProject = () => {
    return (
      <View>
        {this.state.names.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => this.alertItemName(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  toggleModal = () => {
    this.setState(
      {modalVisible: !this.state.modalVisible}
    );
  };

  render() {
    const {profile} = this.state;

    return (
      <View
        flexDirection="column"
        height="100%"
        style={{backgroundColor: 'grey'}}>
        <View
          style={{
            flex: 1,
          }}>
          <ImageBackground
            source={require('../../img/michael-afonso-Z_bTArFy6ks-unsplash.jpg')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}></ImageBackground>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: -20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            justifyContent: 'space-evenly',
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
              onPress={() => this.toggleModal()}
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

          <View>
            <Modal isVisible={this.state.modalVisible}>
              <View style={{backgroundColor: 'white', borderRadius: 20}}>
                <Text style={{textAlign: 'center'}}>Project to Assign</Text>
                <View>
                  {this.state.assignProjectList.map((item, index) => (
                    <ListItem
                      key={index}
                      // leftAvatar={{source: {uri: item.avatar_url}}}
                      title={item.project_name}
                      // subtitle={item.subtitle}
                      bottomDivider
                      onPress={() => {
                        assignProject(
                          {
                            id_engineer: this.state.id_engineer,
                            id_company: this.state.id_company,
                            name_project: item.project_name,
                          },
                          this.state.token,
                        ).then(res => alert(`Success hiring`));
                        this.toggleModal();
                      }}
                    />
                  ))}
                </View>
                <Button title="Cancel Hire" onPress={this.toggleModal} />
              </View>
            </Modal>
          </View>
        </View>

        {/* <View style={{height: 200, padding: 20}}></View> */}
        {/* <Text>{`Ini profile-nya ${profile.name}`}</Text> */}
      </View>
    );
  }
}
