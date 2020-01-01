import React, {Component} from 'react';
import {API_URL} from 'react-native-dotenv';
import {View, Button} from 'react-native';
import {Form, TextValidator} from 'react-native-validator-form';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {createCompany} from '../public/redux/actions/companies';

class createCompanyProfile extends Component {
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

  handleSubmit = () => {
    this.refs.form.submit();
  };

  handleCreate = () => {
    const api = `${API_URL}/api/v1/company/`;
    const data = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
    };
    this.props
      .createCompany(
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

  render() {
    return (
      <ScrollView>
        <View style={{padding: 20}}>
          <Form ref="form" onSubmit={this.handleCreate}>
            <TextValidator
              name="name"
              label="name"
              validators={['required']}
              errorMessages={['Company name is required']}
              placeholder="Company name"
              type="text"
              value={this.state.name}
              onChangeText={e => this.setState({name: e})}
            />
            <TextValidator
              name="description"
              label="description"
              validators={['required']}
              errorMessages={['Company description is required']}
              placeholder="Company description"
              type="text"
              multiline
              value={this.state.description}
              onChangeText={e => this.setState({description: e})}
            />
            <TextValidator
              name="location"
              label="location"
              validators={['required']}
              errorMessages={['Company location is required']}
              placeholder="Company location"
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
  createCompany: (api, data, token, email, userid) =>
    dispatch(createCompany(api, data, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(createCompanyProfile);
