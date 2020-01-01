import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button} from 'native-base';
import {logout} from '../public/redux/actions/user';
import {connect} from 'react-redux';
import {
  fetchEngineers,
  deleteEngineer,
} from '../public/redux/actions/engineers';
import {fetchCompanies} from '../public/redux/actions/companies';
import ProfileEngineer from '../components/engineers/ProfileEngineer';
import ProfileCompany from '../components/companies/ProfileCompany';

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      largeImage: false,
      profileStatus: false,
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      this.onFocusFunction();
    });
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.getData();
  };

  handleDelete = () => {
    this.props.deleteEngineer(
      API_URL + '/api/v1/engineer/' + this.state.engineer_id,
      this.props.auth.token,
      this.props.auth.email,
      this.props.auth.userId,
    );
    this.setState({profileStatus: false});
  };

  getData = () => {
    if (this.props.auth.role === 'engineer') {
      this.props
        .fetchEngineer(
          `${API_URL}/api/v1/engineer/byUserId/` + this.props.auth.userId,
        )
        .then(res => {
          console.log('Result ========== ' + JSON.stringify(res));
          if (res.value.data.dataShowed >= 1) {
            this.setState({profileStatus: true});
          } else {
            this.setState({profileStatus: false});
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({profileStatus: false});
        });
    } else {
      this.props
        .fetchCompany(
          `${API_URL}/api/v1/company/byUserId/` + this.props.auth.userId,
        )
        .then(res => {
          this.setState({profileStatus: true});
        })
        .catch(err => {
          console.log(err);
          this.setState({profileStatus: false});
        });
    }
  };

  render() {
    const user = this.props.auth;
    console.log(this.state.profileStatus);

    if (user.isLogin === false) {
      return <Text>Not Loged in</Text>;
    } else {
      if (this.state.profileStatus === false) {
        return (
          <View>
            <Text>You havent make a profile</Text>
            <Button
              onPress={() =>
                this.props.navigation.navigate('createEngineerProfile')
              }>
              <Text>Make One</Text>
            </Button>
          </View>
        );
      } else {
        if (this.props.auth.role === 'engineer') {
          return <ProfileEngineer />;
        } else {
          return <ProfileCompany />;
        }
      }
    }
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchEngineer: api => dispatch(fetchEngineers(api)),
  fetchCompany: api => dispatch(fetchCompanies(api)),
  logoutUser: _ => dispatch(logout()),
  deleteEngineer: (api, token, email, userid) =>
    dispatch(deleteEngineer(api, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfile);
