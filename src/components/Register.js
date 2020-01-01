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
  Picker,
  CheckBox,
} from 'native-base';
import {fetchUser} from '../public/redux/actions/user';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginOverlay: false,
      registerOverlay: false,
      username: null,
      password: null,
      email: null,
      role: null,
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
      .fetch(api, data)
      .then(() => {
        this.setState({registerOverlay: false});
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
            <Input onChangeText={e => this.setState({password: e})} />
          </Item>
          <CheckBox
            checkedIcon={
              <>
                <Text>Engineer </Text>
                <FontAwesome5Icon size={20} name={'laptop-code'} />
              </>
            }
            uncheckedIcon={
              <>
                <Text>Company </Text>
                <FontAwesome5Icon size={20} name={'building'} />
              </>
            }
            checked={this.state.role === 'engineer' ? true : false}
            onPress={() =>
              this.setState(
                this.state.orderBy === 'engineer'
                  ? {orderBy: 'company'}
                  : {orderBy: 'engineer'},
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
