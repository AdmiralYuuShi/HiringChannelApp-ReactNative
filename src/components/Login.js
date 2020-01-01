import React, {Component} from 'react';
import {View} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {connect} from 'react-redux';
import {
  Right,
  Text,
  Form,
  Item,
  Label,
  Input,
  Header,
  Button,
  Body,
  Title,
} from 'native-base';
import {fetchUser} from '../public/redux/actions/user';

export class Login extends Component {
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
    console.log(API_URL);
    const api = API_URL + ':8080/api/v1/user/login';
    console.warn(api);
    console.warn(this.state.username);
    console.warn(this.state.password);
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
      <View>
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
      </View>
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
