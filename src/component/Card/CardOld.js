import React, {Component} from 'react';
import {View, Button, Image,Text} from 'react-native';
// import './CardOld.css' 
import totalProject from '../../img/iconProject.svg'
// import successRate from './../img/iconSuccess.svg'

export default class CardOld extends Component {
  render() {
    return (
      <View>
        <View className="card-container">
          <View className="card-main">
            <Text className="card-text-name">
              {this.props.name || 'Margaery Tyrell'}
            </Text>
            <Text className="card-text-description">
              {this.props.description || 'Fullstack Dev'}
            </Text>
            <View className="card-project">
              <Image src={totalProject} alt="" />
              <Text className="card-text-total-project">
                {this.props.total_project || '77 Project'} Project
              </Text>
              {/* <Image src={successRate} alt="" />
              <Text className="card-text-success-rate">
                {this.props.successrate || '99 Success Rate'}% Success Rate
              </Text> */}
            </View>
            {/* <hr color="grey" width="200" /> */}
            <Text className="card-text-list-skill">
              {this.props.skill ||
                'MySQL, React, PHP, MongoDB, Laravel, Docker'}
            </Text>
          </View>
        </View>
      </View>
    );

    // return (
    //   <Text>
    //     Testing Response
    //   </Text>
    // )
  }
}
