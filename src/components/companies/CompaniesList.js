import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {withNavigation} from 'react-navigation';
import {View, Text, StyleSheet} from 'react-native';
import {
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Content,
  Spinner,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CompaniesList = props => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <View style={styles.flexOne}>
      <Content style={styles.content}>
        {props.companies.isLoading === true ? (
          <Spinner color="blue" />
        ) : (
          props.companies.companies.map(companies => (
            <TouchableOpacity
              key={companies.company_id}
              onPress={() => {
                props.navigation.navigate('detailCompany', {
                  company_id: companies.company_id,
                  name: companies.name,
                  logo: companies.logo,
                  location: companies.location,
                  description: companies.description,
                  date_created: companies.date_created,
                  date_updated: companies.date_updated,
                });
              }}>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: API_URL + '/images/' + companies.logo,
                      }}
                    />
                    <Body>
                      <Text style={{fontWeight: 'bold'}}>{companies.name}</Text>
                      <Text note numberOfLines={2}>
                        {companies.description}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <View style={styles.container}>
                    <View style={styles.location}>
                      <FontAwesome5
                        name="map-marked-alt"
                        size={15}
                        style={styles.marleft}
                      />
                      <Text note numberOfLines={1}>
                        {companies.location}
                      </Text>
                    </View>
                  </View>
                </CardItem>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </Content>
    </View>
  );
};

const mapStateToProps = state => ({
  companies: state.companies,
});

export default connect(mapStateToProps)(withNavigation(CompaniesList));

const styles = StyleSheet.create({
  content: {margin: 5},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  marleft: {marginRight: 5},
  flexOne: {flex: 1},
});
