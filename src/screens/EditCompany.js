import React, {Component} from 'react';
import {API_URL} from 'react-native-dotenv';
import {View, Text, Button} from 'react-native';
import {Form, TextValidator} from 'react-native-validator-form';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {updateCompany} from '../public/redux/actions/companies';

class EditCompany extends Component {
  constructor() {
    super();
    this.state = {
      company_id: '',
      name: '',
      description: '',
      logo: '',
      location: '',
    };
  }

  componentDidMount() {
    this.applyState();
  }

  applyState() {
    this.setState({company_id: this.props.navigation.getParam('company_id')});
    this.setState({name: this.props.navigation.getParam('name')});
    this.setState({logo: this.props.navigation.getParam('logo')});
    this.setState({description: this.props.navigation.getParam('description')});
    this.setState({location: this.props.navigation.getParam('location')});
  }

  handleEdit = () => {
    const api = `${API_URL}/api/v1/company/${this.state.company_id}`;
    const data = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
    };
    console.log(this.props.auth.userId);
    this.props
      .updatecompany(
        api,
        data,
        this.props.auth.token,
        this.props.auth.email,
        this.props.auth.userId,
      )
      .then(() => {
        this.props.navigation.navigate('tab');
      })
      .catch(e => {
        console.warn(e);
      });
  };

  handleSubmit = () => {
    this.refs.form.submit();
  };

  render() {
    return (
      <ScrollView>
        <View style={{padding: 20}}>
          <Form ref="form" onSubmit={this.handleEdit}>
            <TextValidator
              name="name"
              label="name"
              validators={['required']}
              errorMessages={['Your name is required']}
              placeholder="Your name"
              type="text"
              value={this.state.name}
              onChangeText={e => this.setState({name: e})}
            />
            <TextValidator
              name="description"
              label="description"
              validators={['required']}
              errorMessages={['Your description is required']}
              placeholder="Your description"
              type="text"
              multiline
              value={this.state.description}
              onChangeText={e => this.setState({description: e})}
            />
            <TextValidator
              name="location"
              label="location"
              validators={['required']}
              errorMessages={['Your location is required']}
              placeholder="Your location"
              type="text"
              value={this.state.location}
              onChangeText={e => this.setState({location: e})}
            />
            <Button title="Submit" onPress={this.handleSubmit} />
          </Form>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  updatecompany: (api, data, token, email, userid) =>
    dispatch(updateCompany(api, data, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCompany);
