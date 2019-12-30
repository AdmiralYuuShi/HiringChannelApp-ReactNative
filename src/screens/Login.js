import React, {Component} from 'react';
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
import {Overlay, Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fetchUser} from '../public/redux/actions/user';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginOverlay: false,
      registerOverlay: false,
      username: null,
      password: null,
    };
  }

  handleLogin = _ => {
    const api = 'http://54.161.68.237:8080/api/v1/user/login';
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
                <Input onChangeText={e => this.setState({password: e})} />
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
          <Text>Register</Text>
        </Overlay>
        <Container>
          <Content style={{padding: 30, paddingTop: 400}}>
            <Card>
              <TouchableOpacity
                onPress={() => this.setState({loginOverlay: true})}>
                <CardItem>
                  <Icon active name="logo-googleplus" />
                  <Text>Login</Text>
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('tab')}>
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
});

const mapDispatchToProps = dispatch => ({
  fetch: (api, data) => dispatch(fetchUser(api, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
