import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {View} from 'react-native';
import {Avatar, Tile, Text, Divider, Badge, Icon} from 'react-native-elements';
import {ListItem, Left, Button, Body, Content} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {logout} from '../public/redux/actions/user';
import {connect} from 'react-redux';
import {fetchEngineers} from '../public/redux/actions/engineers';

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
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
    this.props
      .fetchEngineer(
        API_URL + '/api/v1/engineer/byUserId/' + this.props.auth.userId,
      )
      .then(res => {
        this.setState({name: res.value.data.data[0].name});
        this.setState({description: res.value.data.data[0].description});
        this.setState({profil_picture: res.value.data.data[0].profil_picture});
        this.setState({skill: res.value.data.data[0].skill});
        this.setState({date_of_birth: res.value.data.data[0].date_of_birth});
        this.setState({location: res.value.data.data[0].location});
        this.setState({
          expected_salary: res.value.data.data[0].expected_salary,
        });
        this.setState({showcase: res.value.data.data[0].showcase});
        this.setState({phone: res.value.data.data[0].phone});
        this.setState({email: res.value.data.data[0].email});
      });
  }

  render() {
    const user = this.props.auth;
    return (
      <>
        {user.isLogin ? (
          <View>
            {this.props.engineers.isLoading ? (
              <Text>isLoading</Text>
            ) : (
              <ScrollView>
                <View style={{alignItems: 'center'}}>
                  <Tile
                    imageSrc={require('../public/images/engineer_bg.png')}
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
                    onPress={() => console.warn('Works!')}
                    onEditPress={() => console.warn('Edit!')}
                    activeOpacity={0.7}
                    source={{
                      uri: API_URL + '/images/' + this.state.profil_picture,
                    }}
                    showEditButton
                  />
                  <Text h4>{this.state.name}</Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 5,
                      paddingHorizontal: 10,
                    }}>
                    {this.state.description}
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
                            {this.state.skill}
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
                            ${this.state.expected_salary}
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
                            {this.state.location}
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
                          Born in
                          <Text style={{fontWeight: 'bold'}}>
                            {' '}
                            {this.state.date_of_birth}
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
                            {this.state.showcase}
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
                            {this.state.phone}
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
                            {this.state.email}
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
                <Button onPress={() => this.props.logoutUser()}>
                  <Text>Logout</Text>
                </Button>
              </ScrollView>
            )}
          </View>
        ) : (
          <Text>Kamu belum login</Text>
        )}
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
  logoutUser: _ => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyProfile);
