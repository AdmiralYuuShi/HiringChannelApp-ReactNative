import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {View, Dimensions} from 'react-native';
import {Text, Image, Tile} from 'react-native-elements';
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

  setProfilStatus = e => {
    this.setState({profileStatus: false});
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
          if (res.value.data.data.length === 1) {
            this.setState({profileStatus: true});
          } else {
            this.setState({profileStatus: false});
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({profileStatus: false});
        });
    }
  };

  render() {
    const user = this.props.auth;

    if (user.isLogin === false) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Tile
            imageSrc={require('../public/images/searchjob.png')}
            featured
            editButton={{backgroundColor: 'black'}}
            height={200}
          />
          <Text h4 style={{marginTop: 50}}>
            Login To Create Your Profile
          </Text>
          <Button
            onPress={() => this.props.navigation.navigate('login')}
            style={{
              marginTop: 10,
              width: 100,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Login</Text>
          </Button>
        </View>
      );
    } else {
      if (this.state.profileStatus === false) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Tile
              imageSrc={require('../public/images/searchjob.png')}
              featured
              editButton={{backgroundColor: 'black'}}
              height={200}
            />
            <Text h3 style={{marginTop: 50}}>
              Welcome {this.props.auth.username}
            </Text>
            <Text h4>You have'nt create your profile</Text>
            {user.role === 'engineer' ? (
              <Button
                onPress={() =>
                  this.props.navigation.navigate('createEngineerProfile')
                }
                style={{
                  marginTop: 10,
                  width: 100,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>Create One</Text>
              </Button>
            ) : (
              <Button
                onPress={() =>
                  this.props.navigation.navigate('createCompanyProfile')
                }
                style={{
                  marginTop: 10,
                  width: 100,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>Create One</Text>
              </Button>
            )}
            <Button
              onPress={() => this.props.logoutUser()}
              style={{
                marginTop: 10,
                width: 100,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>Logout</Text>
            </Button>
          </View>
        );
      } else {
        if (this.props.auth.role === 'engineer') {
          return <ProfileEngineer profileStatus={this.setProfilStatus} />;
        } else {
          return <ProfileCompany profileStatus={this.setProfilStatus} />;
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
