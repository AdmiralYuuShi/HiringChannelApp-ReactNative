import React, {Component} from 'react';
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
import {CheckBox} from 'react-native-elements';
import {createUser} from '../public/redux/actions/user';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {withNavigation} from 'react-navigation';
import {ToastAndroid} from 'react-native';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      role: 'engineer',
    };
  }

  handleSubmit = () => {
    this.refs.form.submit();
  };

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
        this.props.setOverlay(false);
        ToastAndroid.showWithGravityAndOffset(
          'Successfully Register',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          30,
        );
      })
      .catch(err => {
        console.log(err.response.data.message);
        ToastAndroid.showWithGravityAndOffset(
          err.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          20,
        );
        this.props.errData(err.response.data.message);
      });
  };

  render() {
    return (
      <>
        <Header>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.setOverlay(false)}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
        <Form ref="form" onSubmit={this.handleRegister}>
          <TextValidator
            name="email"
            label="email"
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Email invalid']}
            placeholder="Your email"
            type="text"
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={e => this.setState({email: e})}
          />
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
                onPress={this.handleSubmit}
                rounded
                style={{marginTop: 20, marginBottom: 30}}>
                <Text>Register Now</Text>
              </Button>
            </Right>
          </Header>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (api, data) => dispatch(createUser(api, data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withNavigation(Register));
