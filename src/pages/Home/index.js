import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {Card} from '../../component';
import {storeData, retrieveData} from '../../utils';
import {SearchBar} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import axios from 'axios'
import { getAllEngineer } from '../../Redux/Actions/Data/Engineer/'
// import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-community/async-storage';
import { Navbar } from '../../component/'

export default class Home extends Component {
constructor(){
  super()
}

  state = {
    loggedIn: true,
    token: '',
    search: '',
    searchQuery: '',
    response: [
      {
        id: 277,
        name: 'Ageng',
        skill: 'C++',
        showcase: null,
        total_project: null,
        successrate: null,
      },
      {
        id: 258,
        name: 'Agus',
        skill: 'Assembly, Ruby',
        showcase: null,
        total_project: null,
        successrate: null,
      },
      {
        id: 256,
        name: 'Bima',
        skill: 'Javascript, Phyton',
        showcase: null,
        total_project: null,
        successrate: null,
      },
      {
        id: 248,
        name: 'Brian',
        skill: 'Javascript, PHP, MongoDB, C#',
        showcase: null,
        total_project: null,
        successrate: null,
      },
      {
        id: 243,
        name: 'Budi',
        skill: 'Javascript, C#',
        showcase: null,
        total_project: null,
        successrate: null,
      },
    ],
  };

  componentDidMount = async () => {
    this.setState({token: await retrieveData('token')})

    if (! await retrieveData('token')) {
      this.props.navigation.navigate('Login');
    }
    else{
      this.props.navigation.navigate('Home');
    }
  } 

  componentDidUpdate = async (prevState) => {
    
  }

  updateSearch = search => {
    this.setState({search});
  };

  logoutAccount = async () => {
    await AsyncStorage.clear().then(() => 
    { 
      this.props.navigation.navigate('Login')
      this.setState({loggedIn: !this.state.loggedIn})
    });
  }

  getEngineerList = async () => {
    await this.props.dispatch(
      getAllEngineer(
        {
          sort: this.state.sort_by,
          order: this.state.order,
          page: this.state.page,
          limit: this.state.limit,
          [this.state.search_by]: this.state.search
        },
        this.state.token
      )
    )
  }

  render() {
    const {search, searchQuery} = this.state;

    return (
      // Root Container
      <View flexDirection="column" width="100%">
        {/* App Bar */}
        <Navbar search={this.state.search} updateSearch={this.updateSearch} logoutAccount={this.logoutAccount}/>
        
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </View>

        {/* {this.state.response.map(item => {
            return (
              <Card
                // key={item.id}
                // name={item.name}
                // skill={item.skill}
                // total_project={item.total_project || '0'}
                // successrate={item.successrate || '0'}
              />
            );
          })} */}
      </View>
    );
  }
}

// eslint-disable-next-line no-lone-blocks
{
  /* <Searchbar
            placeholder="Search"
            onChangeText={query => {
              this.setState({searchQuery: query});
            }}
            value={searchQuery}
            cancelIcon
            // inputContainerStyle={{backgroundColor: '#AAA'}}
            >
            </Searchbar> */
}

// {this.state.response.map(item => {
//   return (
//     <Button
//       onClick={async () => {
//         await this.setState({
//           clickedId: item.id,
//           clickedName: item.name,
//           clickedSkill: item.skill,
//           clickedTotalProject: item.total_project,
//           clickedSuccessrate: item.successrate,
//           profileClicked: true
//         });
//         console.log('engineerClicked: ', this.state.clickedId);
//       }}
//     >
//       <Card
//         key={item.id}
//         name={item.name}
//         skill={item.skill}
//         total_project={item.total_project || '0'}
//         successrate={item.successrate || '0'}
//       />
//     </Button>
//   );
// })}
