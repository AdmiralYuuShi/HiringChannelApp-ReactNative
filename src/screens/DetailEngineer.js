import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {View} from 'react-native';
import {Avatar, Tile, Text, Divider, Badge, Icon} from 'react-native-elements';
import {
  ListItem,
  Left,
  Right,
  Button,
  Body,
  Switch,
  Content,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';

const DetailEngineer = props => {
  const engineer_id = props.navigation.getParam('engineer_id');
  const name = props.navigation.getParam('name');
  const profil_picture = props.navigation.getParam('profil_picture');
  const description = props.navigation.getParam('description');
  const email = props.navigation.getParam('email');
  const phone = props.navigation.getParam('phone');
  const expected_salary = props.navigation.getParam('expected_salary');
  const skill = props.navigation.getParam('skill');
  const location = props.navigation.getParam('location');
  const date_of_birth = props.navigation.getParam('date_of_birth');
  const showcase = props.navigation.getParam('showcase');
  return (
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
            uri: `${API_URL}/images/${profil_picture}`,
          }}
          showEditButton
        />
        <Text h4>{name}</Text>
        <Text
          style={{textAlign: 'center', marginTop: 5, paddingHorizontal: 10}}>
          {description}
        </Text>
        <Divider
          style={{backgroundColor: '#90949C', width: 320, marginVertical: 10}}
        />
        <Content style={{flex: 1, alignSelf: 'stretch', marginRight: 20}}>
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
                My skill is <Text style={{fontWeight: 'bold'}}>{skill}</Text>
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
                <Text style={{fontWeight: 'bold'}}>${expected_salary}</Text>
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
                Lives in <Text style={{fontWeight: 'bold'}}>{location}</Text>
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
                <Text style={{fontWeight: 'bold'}}> {date_of_birth}</Text>
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
                <Text style={{fontWeight: 'bold'}}>{showcase}</Text>
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
                <Text style={{fontWeight: 'bold'}}>{phone}</Text>
              </Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button transparent>
                <FontAwesome5 style={{color: '#90949C'}} name="at" size={22} />
              </Button>
            </Left>
            <Body>
              <Text>
                <Text style={{fontWeight: 'bold'}}>{email}</Text>
              </Text>
            </Body>
          </ListItem>
        </Content>
        <Divider
          style={{backgroundColor: '#90949C', width: 320, marginVertical: 10}}
        />
      </View>
    </ScrollView>
  );
};

export default DetailEngineer;
