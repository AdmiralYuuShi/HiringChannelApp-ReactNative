import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content, Card, CardItem, Text} from 'native-base';
import {Overlay, Divider, Image} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchUser, createUser, logout} from '../public/redux/actions/user';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../components/Login';
import RegisterScreen from '../components/Register';
import {Dimensions} from 'react-native';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginOverlay: false,
      registerOverlay: false,
      username: null,
      password: null,
      email: null,
      role: 'engineer',
    };
  }

  handleGuess = _ => {
    this.props.logoutUser();
    this.props.navigation.navigate('tab');
  };

  render() {
    return (
      <>
        <Overlay
          isVisible={this.state.loginOverlay}
          height="auto"
          onBackdropPress={() => this.setState({loginOverlay: false})}>
          <LoginScreen
            setOverlay={overlay => this.setState({loginOverlay: overlay})}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.registerOverlay}
          height="auto"
          onBackdropPress={() => this.setState({registerOverlay: false})}>
          <RegisterScreen
            setOverlay={overlay => this.setState({registerOverlay: overlay})}
          />
        </Overlay>
        <Container style={{position: 'relative'}}>
          <Image
            source={require('../public/images/engineer_bg.png')}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              position: 'absolute',
            }}
          />
          <Content style={{padding: 30, paddingTop: 350}}>
            <Card>
              {this.props.auth.isLogin && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('tab')}>
                  <CardItem>
                    <FontAwesome5
                      active
                      name="user-check"
                      size={20}
                      style={{marginRight: 10}}
                    />
                    <Text>Login as {this.props.auth.username}</Text>
                  </CardItem>
                </TouchableOpacity>
              )}
              <Divider />
              <TouchableOpacity
                onPress={() => this.setState({loginOverlay: true})}>
                <CardItem>
                  <FontAwesome5
                    name="user-alt"
                    size={20}
                    style={{marginRight: 15}}
                  />
                  {this.props.auth.isLogin ? (
                    <Text>Change Account</Text>
                  ) : (
                    <Text>Login</Text>
                  )}
                </CardItem>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => this.setState({registerOverlay: true})}>
                <CardItem>
                  <FontAwesome5
                    active
                    name="user-plus"
                    size={20}
                    style={{marginRight: 10}}
                  />
                  <Text>Register</Text>
                </CardItem>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity onPress={this.handleGuess}>
                <CardItem>
                  <FontAwesome5
                    active
                    name="users"
                    size={20}
                    style={{marginRight: 10}}
                  />
                  <Text>Im Guess</Text>
                </CardItem>
              </TouchableOpacity>
            </Card>
          </Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetch: (api, data) => dispatch(fetchUser(api, data)),
  createUser: (api, data) => dispatch(createUser(api, data)),
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
