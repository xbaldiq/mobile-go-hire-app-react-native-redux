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
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import {getProjectList} from '../../Redux/Actions/Data/Engineer/engineerProjectList';
import {responseProject} from '../../Redux/Actions/Data/Engineer/responseProject';

class HomeEngineer extends Component {

  state = {
    userType: 'engineer'
  }

  componentDidMount = async () => {
    this.setState({engineer_id: await retrieveData('userID')});
    this.setState({username: await retrieveData('username')});
    this.setState({userType: await retrieveData('user_type')});
    this.setState({token: await retrieveData('token')});
    this.setState({name: await retrieveData('name')});
    await this.props.dispatch(getProjectList(this.state.engineer_id));
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
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop:20, alignItems:'center'}}>
        <Avatar.Image
          size={150}
          source={{
            uri:
              'https://www.thewrap.com/wp-content/uploads/2019/11/The-Witcher.png',
          }}
        />
      <Text style={{fontSize:25}}>{this.state.name}</Text>
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
      <View>
        <Navbar logoutAccount={this.logoutAccount} userType={this.state.userType} openDrawer={this.openDrawer} />
        {/* <Text>Hello from engineer</Text> */}
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
              {/* <View
              style={{
                width: '80%',
                borderWidth: 1,
                borderColor: 'black',
                marginVertical: 5,
              }}></View> */}
            </View>
          ))}
        </List>
      </View>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerProjectList: state.engineerProjectList,
  };
};

export default connect(mapStateToProps)(HomeEngineer);
// export default HomeEngineer;
