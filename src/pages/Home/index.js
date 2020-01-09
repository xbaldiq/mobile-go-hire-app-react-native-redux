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

import {SearchBar} from 'react-native-elements';
import {Avatar} from 'react-native-paper';

export default class Home extends Component {
  state = {
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

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search, searchQuery} = this.state;

    return (
      // Container
      <View flexDirection="column" width="100%">
        {/* App Bar */}
        <View
          flexDirection="row"
          style={{
            backgroundColor: 'white',
            padding: 10,
            height: 70,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 150, height: 100}}
            source={require('../../img/logoArkademy.png')}
          />
        </View>

        {/* Search Bar */}
        <View>
          <SearchBar
            platform="default"
            lightTheme
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            round
            clearIcon
            searchIcon
            containerStyle={{backgroundColor: 'white'}}
            inputContainerStyle={{backgroundColor: 'white'}}
          />
        </View>

        <View
          // flexDirection="row"
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            // alignSelf: 'baseline',
            justifyContent: 'center',
            // alignItems: 'center',
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
