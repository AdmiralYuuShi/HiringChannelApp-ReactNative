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
import Moment from 'react-moment';
import {ListItem, Left, Button, Body, Content} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {logout} from '../../public/redux/actions/user';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {
  fetchEngineers,
  deleteEngineer,
  uploadPhoto,
} from '../../public/redux/actions/engineers';

class ProfileEngineer extends React.Component {
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
      '/api/v1/engineer/changeProfilPicture/' +
      this.props.engineers.engineers[0].engineer_id;
    this.props.uploadPhoto(api, formData, config).then(_ => {
      this.setState({changePhoto: false});
    });
  };

  handleDelete = () => {
    this.props.deleteEngineer(
      API_URL +
        '/api/v1/engineer/' +
        this.props.engineers.engineers[0].engineer_id,
      this.props.auth.token,
      this.props.auth.email,
      this.props.auth.userId,
    );
    this.props.profileStatus(false);
  };

  render() {
    const engineer = this.props.engineers.engineers[0];
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
                  uri: API_URL + '/images/' + engineer.profil_picture,
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
                uri: API_URL + '/images/' + engineer.profil_picture,
              }}
              style={{width: 250, height: 250}}
            />
          </>
        </Overlay>
        <View>
          {this.props.engineers.isLoading ? (
            <Text>isLoading</Text>
          ) : (
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                <Tile
                  imageSrc={require('../../public/images/engineer_bg.png')}
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
                    uri: API_URL + '/images/' + engineer.profil_picture,
                  }}
                  showEditButton
                />
                <Text h4>{engineer.name}</Text>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 5,
                    paddingHorizontal: 10,
                  }}>
                  {engineer.description}
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
                          name="code"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        My skill is{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {engineer.skill}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="dollar-sign"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        Expected Salary{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          ${engineer.expected_salary}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="home"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        Lives in{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {engineer.location}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="birthday-cake"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        Born in{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          <Moment format="D MMMM YYYY" element={Text}>
                            {engineer.date_of_birth}
                          </Moment>
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="globe-americas"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {engineer.showcase}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="phone"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {engineer.phone}
                        </Text>
                      </Text>
                    </Body>
                  </ListItem>
                  <ListItem icon>
                    <Left>
                      <Button transparent>
                        <FontAwesome5
                          style={{color: '#90949C'}}
                          name="at"
                          size={22}
                        />
                      </Button>
                    </Left>
                    <Body>
                      <Text>
                        <Text style={{fontWeight: 'bold'}}>
                          {engineer.email}
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
                      this.props.navigation.navigate('editEngineer', {
                        engineer_id: engineer.engineer_id,
                        name: engineer.name,
                        profil_picture: engineer.profil_picture,
                        description: engineer.description,
                        email: engineer.email,
                        phone: engineer.phone,
                        expected_salary: engineer.expected_salary,
                        skill: engineer.skill,
                        location: engineer.location,
                        date_of_birth: moment(engineer.date_of_birth).format(
                          'YYYY-MM-DD',
                        ),
                        showcase: engineer.showcase,
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
  engineers: state.engineers,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchEngineer: api => dispatch(fetchEngineers(api)),
  uploadPhoto: (api, formData, config) =>
    dispatch(uploadPhoto(api, formData, config)),
  logoutUser: _ => dispatch(logout()),
  deleteEngineer: (api, token, email, userid) =>
    dispatch(deleteEngineer(api, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileEngineer));
