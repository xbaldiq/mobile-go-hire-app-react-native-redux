import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';
import {storeData, retrieveData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {Navbar} from '../../component/';
import {Card} from '../../component';
import {Avatar} from 'react-native-paper';
import {getEngineerProfile} from '../../Redux/Actions/Data/Engineer/engineerProfile';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Icon,
  Body,
  Right,
  Button,
} from 'native-base';
import {getProjectList} from '../../Redux/Actions/Data/Engineer/engineerProjectList';
import {responseProject} from '../../Redux/Actions/Data/Engineer/responseProject';

class HomeEngineer extends Component {
  state = {
    userType: 'engineer',
  };

  componentDidMount = async () => {
    this.setState({engineer_id: await retrieveData('userID')});
    this.setState({username: await retrieveData('username')});
    this.setState({userType: await retrieveData('user_type')});
    this.setState({token: await retrieveData('token')});
    this.setState({name: await retrieveData('name')});
    await this.props.dispatch(getProjectList(this.state.engineer_id));
    await this.props.dispatch(getEngineerProfile(this.state.token));
  };

  logoutAccount = async () => {
    await AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('Login');
      this.setState({loggedIn: !this.state.loggedIn});
    });
  };

  handleStatusOnClick = async (e, name, status) => {
    console.log('status clicked');
    await this.props
      .dispatch(
        responseProject({
          id: this.state.engineer_id,
          name_project: name,
          status_project: status,
        }),
      )
      .then(res => {
        alert('success responding');
      });
    await this.props.dispatch(getProjectList(this.state.engineer_id));
  };

  openDrawer = () => {
    this.drawer.openDrawer();
  };

  renderDrawer = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: 20,
          alignItems: 'center',
        }}>
        <Avatar.Image
          size={150}
          source={{
            uri:
              'https://cdn0-production-images-kly.akamaized.net/Ldc2_jBrkfU2sl2FzHnJRtpgHP8=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1060616/original/077298200_1447924136-logo_telegram.png',
          }}
        />
        <Text style={{fontSize: 25, paddingTop: 13}}>{this.state.name}</Text>
        <ListItem
          icon
          onPress={() => {
            // this.props.navigation.navigate('ProjectPage');
            this.props.navigation.navigate('Profile', {});
            this.drawer.closeDrawer();
          }}>
          <Right>
            <Text>Profile</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            // this.props.navigation.navigate('ProjectPage');
            this.drawer.closeDrawer();
          }}>
          <Right>
            <Text>Assigned Project</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </View>
    );
  };

  render() {
    const engineerProjectList = this.props.engineerProjectList;
    return (
      <DrawerLayoutAndroid
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawer}
        ref={_drawer => (this.drawer = _drawer)}>
        <View style={{backgroundColor: '#fff'}}>
          <Navbar
            logoutAccount={this.logoutAccount}
            userType={this.state.userType}
            openDrawer={this.openDrawer}
          />
          {/* <Text>Hello from engineer</Text> */}
          <ScrollView>
            <List>
              {engineerProjectList.engineerProjectList.map((project, index) => (
                <View>
                  <ListItem key={index}>
                    <Body>
                      <Text>
                        {project.project} - {project.status}
                      </Text>
                      <Text note numberOfLines={1}>
                        {project.company}
                      </Text>
                    </Body>
                    {project.status === 'success' ||
                    project.status === 'failed' ||
                    project.status === 'rejected' ? (
                      <Text></Text>
                    ) : (
                      <>
                        <Right>
                          <TouchableOpacity
                            onPress={
                              project.status === 'ongoing'
                                ? e => {
                                    this.handleStatusOnClick(
                                      e,
                                      project.project,
                                      'failed',
                                    );
                                  }
                                : e => {
                                    this.handleStatusOnClick(
                                      e,
                                      project.project,
                                      'rejected',
                                    );
                                  }
                            }>
                            <FontAwesome
                              name="times-circle"
                              size={35}
                              color="maroon"
                            />
                          </TouchableOpacity>
                        </Right>
                        <Right>
                          <TouchableOpacity
                            onPress={
                              project.status === 'ongoing'
                                ? e => {
                                    this.handleStatusOnClick(
                                      e,
                                      project.project,
                                      'success',
                                    );
                                  }
                                : e => {
                                    this.handleStatusOnClick(
                                      e,
                                      project.project,
                                      'ongoing',
                                    );
                                  }
                            }>
                            <FontAwesome
                              active
                              name="check-circle"
                              size={35}
                              color="green"
                            />
                          </TouchableOpacity>
                        </Right>
                      </>
                    )}
                  </ListItem>
                </View>
              ))}
            </List>
          </ScrollView>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerProjectList: state.engineerProjectList,
    engineerProfile: state.engineerProfile,
  };
};

export default connect(mapStateToProps)(HomeEngineer);