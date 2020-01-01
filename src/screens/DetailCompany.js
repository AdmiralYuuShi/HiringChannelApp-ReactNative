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
  const company_id = props.navigation.getParam('company_id');
  const name = props.navigation.getParam('name');
  const logo = props.navigation.getParam('logo');
  const location = props.navigation.getParam('location');
  const description = props.navigation.getParam('description');
  const date_created = props.navigation.getParam('date_created');
  const date_updated = props.navigation.getParam('date_updated');
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
          activeOpacity={0.7}
          source={{
            uri: `${API_URL}/images/${logo}`,
          }}
        />
        <Text h4>{name}</Text>
        <Text
          style={{textAlign: 'center', marginTop: 5, paddingHorizontal: 10}}>
          {description}
        </Text>
        <Content style={{flex: 1, alignSelf: 'stretch', marginRight: 20}}>
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
                Location <Text style={{fontWeight: 'bold'}}>{location}</Text>
              </Text>
            </Body>
          </ListItem>
        </Content>
      </View>
    </ScrollView>
  );
};

export default DetailEngineer;
