import React, {Component} from 'react';
import {API_URL} from 'react-native-dotenv';
import {View, Text, Button} from 'react-native';
import {Form, TextValidator} from 'react-native-validator-form';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {createEngineer} from '../public/redux/actions/engineers';
import DatePicker from 'react-native-datepicker';

class createEngineerProfile extends Component {
  constructor() {
    super();
    this.state = {
      engineer_id: '',
      name: '',
      description: '',
      profil_picture: '',
      skill: '',
      date_of_birth: '',
      location: '',
      expected_salary: '',
      showcase: '',
      phone: '',
      email: '',
    };
  }

  componentDidMount() {
    this.applyState();
  }

  applyState() {
    this.setState({email: this.props.auth.email});
  }

  handleSubmit = () => {
    this.refs.form.submit();
  };

  handleCreate = () => {
    const api = `${API_URL}/api/v1/engineer/`;
    const data = {
      name: this.state.name,
      description: this.state.description,
      skill: this.state.skill,
      location: this.state.location,
      dateOfBirth: this.state.date_of_birth,
      showcase: this.state.showcase,
      expectedSalary: this.state.expected_salary,
      email: this.state.email,
      phone: this.state.phone,
    };
    this.props
      .createEngineer(
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
              name="skill"
              label="skill"
              validators={['required']}
              errorMessages={['Your skill is required']}
              placeholder="Your skill"
              type="text"
              multiline
              value={this.state.skill}
              onChangeText={e => this.setState({skill: e})}
            />
            <TextValidator
              name="expected_salary"
              label="expected_salary"
              validators={['required']}
              errorMessages={['Your expected salary is required']}
              placeholder="Your expected_salary"
              type="number"
              keyboardType="number-pad"
              value={this.state.expected_salary}
              onChangeText={e => this.setState({expected_salary: e})}
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
            <DatePicker
              style={{width: 200}}
              date={this.state.date_of_birth}
              mode="date"
              placeholder="Date of Birth"
              format="YYYY-MM-DD"
              minDate="1800-01-01"
              maxDate="2020-12-12"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({date_of_birth: date});
              }}
            />
            <TextValidator
              name="showcase"
              label="showcase"
              validators={['required']}
              errorMessages={['Your showcase is required']}
              placeholder="Your showcase"
              type="text"
              value={this.state.showcase}
              onChangeText={e => this.setState({showcase: e})}
            />
            <TextValidator
              name="phone"
              label="phone"
              validators={['required']}
              errorMessages={['Your phone is required']}
              placeholder="Your phone"
              type="text"
              keyboardType="phone-pad"
              value={this.state.phone}
              onChangeText={e => this.setState({phone: e})}
            />
            <TextValidator
              disabled
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
            <Button title="Submit" onPress={this.handleSubmit} />
          </Form>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  createEngineer: (api, data, token, email, userid) =>
    dispatch(createEngineer(api, data, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(createEngineerProfile);
