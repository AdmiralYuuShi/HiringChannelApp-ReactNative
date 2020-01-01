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
import {deleteCompany} from '../../public/redux/actions/companies';

class ProfileCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      largeImage: false,
    };
  }

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
                  imageSrc={require('../../public/images/engineer_bg.png')}
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                  featured
                  editButton={{backgroundColor: 'black'}}
                  height={200}
                  caption="Some Caption Text"
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
                  onEditPress={() => console.warn('Edit!')}
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
  deleteCompany: (api, token, email, userid) =>
    dispatch(deleteCompany(api, token, email, userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ProfileCompany));
