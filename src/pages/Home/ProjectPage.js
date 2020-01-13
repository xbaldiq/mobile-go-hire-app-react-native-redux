import React, {Component} from 'react';
// import {Text, List,} from 'react-native-paper';
import {View, Text, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {getAssignedProject} from '../../Redux/Actions/Data/Company/getAssignedProject';
import {connect} from 'react-redux';
import {storeData, retrieveData} from '../../utils';
import {
  Container,
  Header,
  Content,
  ListItem,
  List,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import {Navbar} from '../../component/';

class ProjectPage extends Component {
  state = {};

  componentDidMount = async () => {
    this.setState({token: await retrieveData('token')});
    // await this.props.dispatch(getAssignedProject(this.state.token));
  };

  render() {
    // const assignedProject = this.props.assignedProject;

    return (
      <View>
        <Navbar />
        <ScrollView>
          <List>
            {this.props.assignedProject.assignedProject.map(
              (project, index) => {
                return (
                  <ListItem key={index}>
                    <Body>
                      <Text>
                        {project.name_project} - {project.engineer}
                      </Text>
                      <Text note numberOfLines={1}>
                        {project.status_project}
                      </Text>
                    </Body>
                  </ListItem>
                );
              },
            )}
          </List>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    assignedProject: state.assignedProject,
  };
};

export default connect(mapStateToProps)(ProjectPage);
