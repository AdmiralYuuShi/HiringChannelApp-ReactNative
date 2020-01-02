import React from 'react';
import {View, Dimensions} from 'react-native';
import {Text, Image, Tile} from 'react-native-elements';
import {Button} from 'native-base';

const About = props => {
  return (
    <View
      style={{
        marginTop: 30,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Tile
        imageSrc={require('../public/images/logo.png')}
        featured
        editButton={{backgroundColor: 'black'}}
        height={200}
        width={240}
      />
      <Text h4 style={{marginTop: 10}}>
        About
      </Text>
      <Text style={{paddingHorizontal: 20, textAlign: 'center'}}>The <Text style={{fontWeight: 'bold'}}>Hiring Channel App</Text> is a Application that show you a data from Engineers and Company, which is made for Engineers to enter their profiles so that Companies can searching for Engineers that match their specifications.</Text>
      <Text style={{paddingHorizontal: 20, marginTop: 20, textAlign: 'center'}}>
        v0.0.1
      </Text>
      <Text style={{paddingHorizontal: 20, marginTop: 20, textAlign: 'center'}}>
        By : Hapid Moch Jamil
      </Text>
    </View>
  )
}

export default About;
