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
} from 'react-native';
import {storeData, retrieveData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {Navbar} from '../../component/';
import {Card} from '../../component';
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
  componentDidMount = async () => {
    this.setState({engineer_id: await retrieveData('userID')});
    this.setState({username: await retrieveData('username')});
    this.setState({token: await retrieveData('token')});
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

  render() {
    const engineerProjectList = this.props.engineerProjectList;
    // console.log(engineerProjectList.engineerProjectList);

    return (
      <View>
        <Navbar logoutAccount={this.logoutAccount} />
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
