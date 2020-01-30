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
  Button,
  DrawerLayoutAndroid,
} from 'react-native';

import {Card} from '../../component';
import {storeData, retrieveData} from '../../utils';
import {SearchBar} from 'react-native-elements';
import {Avatar, Text, Divider, TextInput} from 'react-native-paper';
import axios from 'axios';
import {getAllEngineer} from '../../Redux/Actions/Data/Engineer/';
import {getListProject} from '../../axios/axios';
// import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';
import {Navbar} from '../../component/';
import RBSheet from 'react-native-raw-bottom-sheet';
import {getAssignedProject} from '../../Redux/Actions/Data/Company/getAssignedProject';
import { createNewProject } from '../../Redux/Actions/Data/Company/createNewProject';
import Modal from 'react-native-modal';
import {
  Container,
  Header,
  Content,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';

class Home extends Component {
  constructor() {
    super();
  }

  state = {
    company_id: 0,

    page: 1,
    limit: 5,
    order: 'asc',
    search_by: 'name',
    sort_by: 'name',
    totalPages: 0,
    total_data: 0,
    modalVisible: false,

    loggedIn: true,
    token: '',
    search: '',
    searchQuery: '',
    response: [],
    projectList: [],
  };

  componentDidMount = async () => {
    // get all engineer
    if (!(await retrieveData('token'))) {
      this.props.navigation.navigate('Login');
    } else {
      // If have token engineer
      this.setState({user_type: await retrieveData('user_type')}, async () => {
        if (this.state.user_type === 'engineer') {
          this.props.navigation.navigate('HomeEngineer');
        } else {
          this.setState(
            {token: await retrieveData('token')},
            this.getAllEngineer,
          );
          this.setState({company_id: await retrieveData('userID')});
          this.setState({username: await retrieveData('username')});
          this.setState({name: await retrieveData('name')});
          getListProject(this.state.token).then(res =>
            this.setState({projectList: res}),
          );
          await this.props.dispatch(getAssignedProject(this.state.token));
        }
      });
    }
  };

  updateSearch = search => {
    this.setState({search}, () => this.getAllEngineer());
  };

  logoutAccount = async () => {
    await AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('Login');
      this.setState({loggedIn: !this.state.loggedIn});
    });
  };

  setTotalPage = () => {
    this.setState({
      totalPages: Math.ceil(this.state.total_data / this.state.limit),
    });
  };

  pagination = direction => {
    if (direction === 'left') {
      if (this.state.page > 1)
        this.setState({page: this.state.page - 1}, () => {
          console.log(this.state.page);
          this.getAllEngineer();
        });
    } else if (
      direction === 'right' &&
      this.state.page <= this.state.totalPages
    ) {
      if (this.state.page === this.state.totalPages) {
        this.getAllEngineer();
      } else {
        this.setState({page: this.state.page + 1}, () => {
          console.log(this.state.page);
          this.getAllEngineer();
        });
      }
    }
  };

  getAllEngineer = async () => {
    await this.props.dispatch(
      getAllEngineer(
        {
          sort: this.state.sort_by,
          order: this.state.order,
          page: this.state.page,
          limit: this.state.limit,
          [this.state.search_by]: this.state.search,
        },
        this.state.token,
      ),
    );
    this.setState(
      {
        response: this.props.engineerList.response,
        total_data: this.props.engineerList.total_data,
      },
      () => this.setTotalPage(),
    );
  };

  onChange = (key, value) => {
    this.setState({[key]: value}, this.getAllEngineer);
  };

  openDrawer = () => {
    this.drawer.openDrawer();
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
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
        <ListItem icon>
          <Right>
            <Text>Profile</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            this.props.navigation.navigate('ProjectPage');
            this.drawer.closeDrawer();
          }}>
          <Right>
            <Text>Assigned Project</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            this.toggleModal();
            this.drawer.closeDrawer();
          }}>
          <Right>
            <Text>Add Project</Text>
            <Icon active name="arrow-forward" />
          </Right>
        </ListItem>
      </View>
    );
  };

  render() {
    const {engineerList} = this.props;
    const {search, searchQuery} = this.state;

    return (
      <DrawerLayoutAndroid
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawer}
        ref={_drawer => (this.drawer = _drawer)}>
        <View
          flexDirection="column"
          // width="150%"
          height="100%">
          {/* App Bar */}
          <Navbar
            search={this.state.search}
            updateSearch={this.updateSearch}
            logoutAccount={this.logoutAccount}
            openDrawer={this.openDrawer}
          />
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {this.state.response.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      console.log(JSON.stringify(engineerList.response[index]));
                      this.props.navigation.navigate('Profile', {
                        id: item.id,
                        profile: engineerList.response[index],
                        total_project: item.total_project || '0',
                        successrate: item.successrate || '0',
                        assignProjectList: this.state.projectList,
                        id_company: this.state.company_id,
                        token: this.state.token,
                      });
                    }}>
                    <Card
                      key={item.id}
                      name={item.name}
                      skill={item.skill}
                      description={item.description}
                      total_project={item.total_project || '0'}
                      successrate={item.successrate || '0'}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          {/* <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              height: 45,
              backgroundColor: 'gray',
            }}>
            <TouchableOpacity onPress={() => this.pagination('left')}>
              <Ionicons name="ios-arrow-dropleft" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.pagination('right')}>
              <Ionicons name="ios-arrow-dropright" size={40} color="white" />
            </TouchableOpacity>
          </View> */}
          <FloatingButton
            order={this.state.order}
            search_by={this.state.search_by}
            limit={this.state.limit}
            onChange={this.onChange}
          />
          <View>
            <Modal isVisible={this.state.modalVisible}>
              <View style={{backgroundColor: 'white', borderRadius: 10}}>
                <Text style={{textAlign: 'center'}}>Project to Assign</Text>
                <TextInput
                  // label="Email"
                  value={this.state.text}
                  onChangeText={addProject => this.setState({addProject})}
                />
                <Button
                  title="Add"
                  onPress={ async () => {
                    await this.props.dispatch(createNewProject(this.state.addProject,this.state.token)).then((res) => {
                      alert('Create project success')
                      this.setState({addProject:''})
                    });
                    this.toggleModal;
                  }}
                />
                <Button title="Cancel" onPress={this.toggleModal} />
              </View>
            </Modal>
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = state => {
  return {
    engineerList: state.engineerList,
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const FloatingButton = props => {
  return (
    <ActionButton buttonColor="rgba(122,215,255,1)" position="right">
      {/* Sort */}
      <ActionButton.Item
        buttonColor="#9b59b6"
        title={`${props.order.toUpperCase()} Sorting`}
        onPress={() => {
          if (props.order == 'asc') {
            props.onChange('order', 'desc');
          } else {
            props.onChange('order', 'asc');
          }
        }}>
        {props.order == 'asc' ? (
          <MaterialCommunityIcons
            name="sort-ascending"
            style={styles.actionButtonIcon}
          />
        ) : (
          <MaterialCommunityIcons
            name="sort-descending"
            style={styles.actionButtonIcon}
          />
        )}
      </ActionButton.Item>

      {/* Filter */}
      <ActionButton.Item
        buttonColor="#3498db"
        title={`Filter by ${props.search_by.toUpperCase()}`}
        onPress={() => {
          if (props.search_by == 'name') {
            props.onChange('search_by', 'skill');
          } else {
            props.onChange('search_by', 'name');
          }
        }}>
        <Ionicons name="ios-search" style={styles.actionButtonIcon} />
      </ActionButton.Item>

      {/* Limit */}
      <ActionButton.Item
        buttonColor="#1abc9c"
        title={`${props.limit} items per page`}
        onPress={() => {
          if (props.limit == 5) {
            props.onChange('limit', 10);
          } else if (props.limit == 10) {
            props.onChange('limit', 20);
          } else if (props.limit == 20) {
            props.onChange('limit', 50);
          } else if (props.limit == 50) {
            props.onChange('limit', 5);
          }
        }}>
        <Ionicons name="ios-list" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};
