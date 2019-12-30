import React from 'react';
import {View} from 'react-native';
import {Avatar, Tile, Text, Divider, Badge, Icon} from 'react-native-elements';
import {
  ListItem,
  Left,
  Right,
  Button,
  Body,
  Switch,
  Content,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchEngineers} from '../public/redux/actions/engineers';
import {logout} from '../public/redux/actions/user';
import {connect} from 'react-redux';

class MyProfile extends React.Component {
  render() {
    console.log(this.props.auth);
    const user = this.props.auth;
    return (
      <>
        {user.isLogin ? (
          <View>
            <Text>Loged in</Text>
            <Button onPress={() => this.props.logoutUser()}>
              <Text>Logout</Text>
            </Button>
          </View>
        ) : (
          <Text>Kamu belum login</Text>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchEngineer: api => dispatch(fetchEngineers(api)),
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfile);
