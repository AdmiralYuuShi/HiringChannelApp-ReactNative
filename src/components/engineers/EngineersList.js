import React from 'react';
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
import GestureRecognizer from 'react-native-swipe-gestures';
import {fetchEngineers} from '../../public/redux/actions/engineers';
import {TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';

const EngineersList = props => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <View style={styles.flexOne}>
      <GestureRecognizer
        style={styles.flexOne}
        onSwipeLeft={() => props.fetch(props.engineers.detailPage.nextLink)}
        onSwipeRight={() => props.fetch(props.engineers.detailPage.prevLink)}
        config={config}>
        <Content style={styles.content}>
          {props.engineers.isLoading === true ? (
            <Spinner color="blue" />
          ) : (
            props.engineers.engineers.map(engineers => (
              <TouchableOpacity
                key={engineers.engineer_id}
                onPress={() => {
                  props.navigation.navigate('detail', {
                    engineer_id: engineers.engineer_id,
                    name: engineers.name,
                    profil_picture: engineers.profil_picture,
                    description: engineers.description,
                    email: engineers.email,
                    phone: engineers.phone,
                    expected_salary: engineers.expected_salary,
                    skill: engineers.skill,
                    location: engineers.location,
                    date_of_birth: engineers.date_of_birth,
                    showcase: engineers.showcase,
                  });
                }}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            'http://54.161.68.237:8080/images/' +
                            engineers.profil_picture,
                        }}
                      />
                      <Body>
                        <Text>{engineers.name}</Text>
                        <Text note numberOfLines={2}>
                          {engineers.description}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <View style={styles.container}>
                      <View style={styles.salary}>
                        <FontAwesome5
                          size={15}
                          name="search-dollar"
                          style={styles.marleft}
                        />
                        <Text>${engineers.expected_salary}</Text>
                      </View>
                      <View style={styles.skill}>
                        <FontAwesome5
                          name="code"
                          size={15}
                          style={styles.marleft}
                        />
                        <Text note numberOfLines={1}>
                          {engineers.skill}
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </Content>
      </GestureRecognizer>
    </View>
  );
};

const mapStateToProps = state => ({
  engineers: state.engineers,
});

const mapDispatchToProps = dispatch => ({
  fetch: api => dispatch(fetchEngineers(api)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(EngineersList));

const styles = StyleSheet.create({
  content: {margin: 5},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  salary: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  marleft: {marginRight: 5},
  flexOne: {flex: 1},
});
