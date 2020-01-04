import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {API_URL} from 'react-native-dotenv';
import {connect} from 'react-redux';
import {
  Right,
  Text,
  Item,
  Label,
  Input,
  Header,
  Button,
  Body,
  Title,
} from 'native-base';
import {Form, TextValidator} from 'react-native-validator-form';
import {fetchUser} from '../public/redux/actions/user';
import {withNavigation} from 'react-navigation';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  handleSubmit = () => {
    this.refs.form.submit();
  };

  handleLogin = _ => {
    const api = API_URL + '/api/v1/user/login';
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(data);
    this.props
      .fetch(api, data)
      .then(() => {
        this.props.setOverlay(false);
        ToastAndroid.showWithGravityAndOffset(
          'Login Success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          20,
        );
        this.props.navigation.navigate('tab');
      })
      .catch(err => {
        ToastAndroid.showWithGravityAndOffset(
          err.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          20,
        );
        throw err;
      });
  };

  render() {
    return (
      <>
        <Header>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.setOverlay(false)}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Form ref="form" onSubmit={this.handleLogin}>
          <TextValidator
            name="username"
            label="username"
            validators={['required']}
            errorMessages={['Username is required']}
            placeholder="Username"
            type="text"
            value={this.state.username}
            onChangeText={e => this.setState({username: e})}
          />
          <TextValidator
            name="password"
            label="text"
            secureTextEntry
            placeholder="Password"
            validators={['required']}
            errorMessages={['Password is required']}
            type="text"
            value={this.state.password}
            onChangeText={e => this.setState({password: e})}
          />
          <Header transparent>
            <Body>
              <Title>Login</Title>
            </Body>
            <Right>
              <Button
                onPress={this.handleSubmit}
                rounded
                style={{marginTop: 20, marginBottom: 30}}>
                <Text>Login Now</Text>
              </Button>
            </Right>
          </Header>
        </Form>
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
)(withNavigation(Login));
