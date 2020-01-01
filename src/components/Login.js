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
import {withNavigation} from 'react-navigation';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  handleLogin = _ => {
    const api = API_URL + '/api/v1/user/login';
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props
      .fetch(api, data)
      .then(() => {
        this.props.setOverlay(false);
        this.props.navigation.navigate('tab');
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.props.errData(err.response.data.message);
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
