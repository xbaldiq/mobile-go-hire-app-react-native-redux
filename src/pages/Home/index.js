import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';
import {Navbar} from '../../component/';

class Home extends Component {
  constructor() {
    super();
  }

  state = {
    page: 1,
    limit: 5,
    order: 'asc',
    search_by: 'name',
    sort_by: 'name',
    totalPages: 0,
    total_data: 0,

    loggedIn: true,
    token: '',
    search: '',
    searchQuery: '',
    response: [],
  };

  componentDidMount = async () => {
    this.setState({token: await retrieveData('token')}, () => this.getAllEngineer());
    // get all engineer
   
    if (!(await retrieveData('token'))) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Home');
    }
  };

  componentDidUpdate = async prevState => {
    // this.getAllEngineer();
  };

  updateSearch = search => {
    this.setState({search});
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
    // console.log(this.state.totalPages)
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
    this.setState({
      response: this.props.engineerList.response,
      total_data: this.props.engineerList.total_data,
    }, () => this.setTotalPage());
  };

  render() {
    const {engineerList} = this.props;
    const {search, searchQuery} = this.state;

    return (
      // Root Container
      <View
        flexDirection="column"
        // width="150%"
        height="100%">
        {/* App Bar */}
        <Navbar
          search={this.state.search}
          updateSearch={this.updateSearch}
          logoutAccount={this.logoutAccount}
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
        <View
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
        </View>
        {/* <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            console.log('hi');
          }}
        /> */}
        <Testing />
      </View>
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

const Testing = () => {
  return (
    <ActionButton buttonColor="rgba(122,215,255,1)" position="center">
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="New Task"
        onPress={() => console.log('notes tapped!')}>
        <Ionicons name="md-create" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Notifications"
        onPress={() => console.log('notes notification!')}>
        <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#1abc9c"
        title="All Tasks"
        onPress={() => console.log('notes ')}>
        <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
};
