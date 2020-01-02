import React from 'react';
import moment from 'moment';
import {API_URL} from 'react-native-dotenv';
import {View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  Avatar,
  Tile,
  Text,
  Divider,
  Overlay,
  Image,
} from 'react-native-elements';
import {ListItem, Left, Button, Body, Content} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {logout} from '../../public/redux/actions/user';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {deleteCompany, uploadPhoto} from '../../public/redux/actions/companies';

class ProfileCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      largeImage: false,
      photo: null,
      changePhoto: false,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  handleSavePhoto = () => {
    let formData = new FormData();
    formData.append('file', {
      name: this.state.photo.fileName,
      type: this.state.photo.type,
      uri: this.state.photo.uri,
    });
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${this.props.auth.token}`,
        email: this.props.auth.email,
        userid: this.props.auth.userId,
      },
    };
    const api =
      API_URL +
      '/api/v1/company/changeLogo/' +
      this.props.companies.companies[0].company_id;
    this.props.uploadPhoto(api, formData, config).then(_ => {
      this.setState({changePhoto: false});
    });
  };

  handleDelete = () => {
    this.props.deleteCompany(
      API_URL +
        '/api/v1/company/' +
        this.props.companies.companies[0].company_id,
      this.props.auth.token,
      this.props.auth.email,
      this.props.auth.userId,
    );
    this.props.profileStatus(false);
  };

  render() {
    const company = this.props.companies.companies[0];
    return (
      <>
        {this.getData}
        <Overlay
          isVisible={this.state.changePhoto}
          height="auto"
          width="auto"
          onBackdropPress={() => this.setState({changePhoto: false})}>
          <>
            {this.state.photo ? (
              <Image
                source={{uri: this.state.photo.uri}}
                style={{width: 250, height: 250}}
              />
            ) : (
              <Image
                source={{
                  uri: API_URL + '/images/' + company.logo,
                }}
                style={{width: 250, height: 250}}
              />
            )}
            <Button
              style={{marginTop: 10}}
              block
              light
              onPress={this.handleChoosePhoto}>
              <Text style={{justifyContent: 'center'}}>Select Photo</Text>
            </Button>
            {this.state.photo && (
              <Button
                block
                success
                style={{marginTop: 5}}
                onPress={this.handleSavePhoto}>
                <Text>Save</Text>
              </Button>
            )}
          </>
        </Overlay>
        <Overlay
          isVisible={this.state.largeImage}
          height="auto"
          width="auto"
          onBackdropPress={() => this.setState({largeImage: false})}>
          <>
            <Image
              source={{
                uri: API_URL + '/images/' + company.logo,
              }}
              style={{width: 250, height: 250}}
            />
          </>
        </Overlay>
        <View>
          {this.props.companies.isLoading ? (
            <Text>isLoading</Text>
          ) : (
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Tile
                  imageSrc={require('../../public/images/company_bg.png')}
                  featured
                  editButton={{backgroundColor: 'black'}}
                  height={200}
                />
                <Avatar
                  containerStyle={{
                    marginTop: -75,
                    borderStyle: 'solid',
                    borderWidth: 5,
                    borderColor: 'white',
                  }}
                  rounded
                  size="xlarge"
                  onPress={() => this.setState({largeImage: true})}
                  onEditPress={() => this.setState({changePhoto: true})}
                  activeOpacity={0.7}
                  source={{
                    uri: API_URL + '/images/' + company.logo,
                  }}
                  showEditButton
                />
                <Text h4>{company.name}</Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    paddingHorizontal: 10,
                  }}>
                  {company.description}
                </Text>
                <Divider
                  style={{
                    backgroundColor: '#90949C',
                    width: 320,
                    marginVertical: 10,
                  }}
                />
                <Content
                  style={{flex: 1, alignSelf: 'stretch', marginRight: 20}}>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="map-marked-alt"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        Location{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {company.location}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                </Content>
                <Divider
                  style={{
                    backgroundColor: '#90949C',
                    width: 320,
                    marginVertical: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    onPress={() => {
                      this.props.navigation.navigate('editCompany', {
                        company_id: company.company_id,
                        name: company.name,
                        logo: company.logo,
                        description: company.description,
                        location: company.location,
                      });
                    }}
                    size="medium"
                    rounded
                    icon={{
                      name: 'account-edit',
                      type: 'material-community',
                    }}
                  />
                  <Text>Edit Profile</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    onPress={this.handleDelete}
                    size="medium"
                    rounded
                    icon={{name: 'trash', type: 'font-awesome'}}
                  />
                  <Text>Delete Profile</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    onPress={() => this.props.logoutUser()}
                    size="medium"
                    rounded
                    icon={{name: 'logout', type: 'material-community'}}
                  />
                  <Text>Logout</Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: _ => dispatch(logout()),
  uploadPhoto: (api, formData, config) =>
    dispatch(uploadPhoto(api, formData, config)),
  deleteCompany: (api, token, email, userid) =>
    dispatch(deleteCompany(api, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileCompany));
