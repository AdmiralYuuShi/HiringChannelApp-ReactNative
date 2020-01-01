import React, {Component} from 'react';
import {API_URL} from 'react-native-dotenv';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Text,
  Form,
  Item,
  Label,
  Input,
  H2,
  Header,
  Left,
  Button,
  Body,
  Title,
} from 'native-base';
import {CheckBox} from 'react-native-elements';
import {Overlay, Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchUser, createUser, logout} from '../public/redux/actions/user';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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

  handleRegister = _ => {
    const api = API_URL + '/api/v1/user/register';
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };
    this.props
      .createUser(api, data)
      .then(() => {
        this.setState({registerOverlay: false});
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({errMessage: err.response.data.message});
      });
  };

  handleLogin = _ => {
    const api = API_URL + '/api/v1/user/login';
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props
      .fetch(api, data)
      .then(() => {
        this.setState({loginOverlay: false});
        this.props.navigation.navigate('tab');
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({errMessage: err.response.data.message});
      });
  };

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
          <>
            <Header>
              <Body>
                <Title>Login</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => this.setState({loginOverlay: false})}>
                  <Text>Cancel</Text>
                </Button>
              </Right>
            </Header>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={e => this.setState({username: e})} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  onChangeText={e => this.setState({password: e})}
                />
              </Item>
              <Header transparent>
                <Body>
                  <Title>Login</Title>
                </Body>
                <Right>
                  <Button
                    onPress={this.handleLogin}
                    rounded
                    style={{marginTop: 20, marginBottom: 30}}>
                    <Text>Login Now</Text>
                  </Button>
                </Right>
              </Header>
            </Form>
          </>
        </Overlay>
        <Overlay
          isVisible={this.state.registerOverlay}
          height="auto"
          onBackdropPress={() => this.setState({registerOverlay: false})}>
          <>
            <Header>
              <Body>
                <Title>Register</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => this.setState({registerOverlay: false})}>
                  <Text>Cancel</Text>
                </Button>
              </Right>
            </Header>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={e => this.setState({email: e})} />
              </Item>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={e => this.setState({username: e})} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  onChangeText={e => this.setState({password: e})}
                />
              </Item>
              <CheckBox
                checkedIcon={
                  <>
                    <Text>Register as Engineer </Text>
                    <FontAwesome5Icon size={20} name={'laptop-code'} />
                  </>
                }
                uncheckedIcon={
                  <>
                    <Text>Register as Company </Text>
                    <FontAwesome5Icon size={20} name={'building'} />
                  </>
                }
                checked={this.state.role === 'engineer' ? true : false}
                onPress={() =>
                  this.setState(
                    this.state.role === 'engineer'
                      ? {role: 'company'}
                      : {role: 'engineer'},
                  )
                }
              />
              <Header transparent>
                <Right>
                  <Button
                    onPress={this.handleRegister}
                    rounded
                    style={{marginTop: 20, marginBottom: 30}}>
                    <Text>Register Now</Text>
                  </Button>
                </Right>
              </Header>
            </Form>
          </>
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
