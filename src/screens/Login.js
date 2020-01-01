import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Text,
} from 'native-base';
import {Overlay, Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchUser, createUser, logout} from '../public/redux/actions/user';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from '../components/Login';
import RegisterScreen from '../components/Register';

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
      errMessage: null,
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
            errData={err => this.setState({errMessage: err})}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.registerOverlay}
          height="auto"
          onBackdropPress={() => this.setState({registerOverlay: false})}>
          <RegisterScreen
            setOverlay={overlay => this.setState({registerOverlay: overlay})}
            errData={err => this.setState({errMessage: err})}
          />
        </Overlay>
        <Container>
          <Content style={{padding: 30, paddingTop: 350}}>
            <Card>
              {this.props.auth.isLogin && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('tab')}>
                  <CardItem>
                    <Icon active name="logo-googleplus" />
                    <Text>Login as {this.props.auth.username}</Text>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </CardItem>
                </TouchableOpacity>
              )}
              <Divider />
              <TouchableOpacity
                onPress={() => this.setState({loginOverlay: true})}>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  {this.props.auth.isLogin ? (
                    <Text>Change Account</Text>
                  ) : (
                    <Text>Login</Text>
                  )}
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => this.setState({registerOverlay: true})}>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Register</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity onPress={this.handleGuess}>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Im Guess</Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
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
