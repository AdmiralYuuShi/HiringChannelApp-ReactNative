import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Left,
  Right,
  Title,
  Body,
  View,
  Form,
  Picker,
} from 'native-base';
import {connect} from 'react-redux';
import lodash from 'lodash';
import EngineersList from '../components/engineers/EngineersList';
import {Overlay, Slider, Divider, Text, CheckBox} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {fetchEngineers} from '../public/redux/actions/engineers';

class Engineers extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
      sortBy: 'name',
      orderBy: 'ASC',
      search: '',
      limit: 5,
      active: false,
      overlay: false,
    };
    this.search = lodash.debounce(this.search, 500);
  }

  componentDidMount() {
    this.fetchEngineers();
  }

  showSearch = _ => {
    this.setState({showSearch: !this.state.showSearch});
  };

  onSortChange(value) {
    this.setState({
      sortBy: value,
    });
  }

  handleFilter = _ => {
    this.fetchEngineers(
      this.state.search,
      this.state.sortBy,
      this.state.orderBy,
      this.state.limit,
    );
    this.setState({overlay: false});
  };

  search = e => {
    this.setState({search: e});
    this.fetchEngineers(
      e,
      this.state.sortBy,
      this.state.orderBy,
      this.state.limit,
    );
  };

  fetchEngineers = (
    search = '',
    sortBy = 'name',
    orderBy = 'ASC',
    limit = 5,
  ) => {
    const api =
      API_URL +
      '/api/v1/engineer?search=' +
      search +
      '&page=1&sortBy=' +
      sortBy +
      '&orderBy=' +
      orderBy +
      '&limit=' +
      limit;
    this.props.fetch(api);
  };

  fabPress = function() {
    console.warn('OwO');
  };

  render() {
    const {search, showSearch} = this.state;
    return (
      <>
        <Overlay
          isVisible={this.state.overlay}
          height="auto"
          onBackdropPress={() => this.setState({overlay: false})}>
          <>
            <Text h3>Filter</Text>
            <Divider style={{marginVertical: 5}} />
            <Text>Limit : {this.state.limit}</Text>
            <Slider
              value={this.state.limit}
              maximumValue={15}
              minimumValue={1}
              step={1}
              animateTransitions={true}
              onValueChange={limit => this.setState({limit})}
            />
            <Text>Sort By :</Text>
            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: 200}}
                selectedValue={this.state.sortBy}
                onValueChange={this.onSortChange.bind(this)}>
                <Picker.Item label="Name" value="name" />
                <Picker.Item label="Skill" value="skill" />
                <Picker.Item label="Date Updated" value="date_updated" />
              </Picker>
            </Form>
            <Text>Order By :</Text>
            <CheckBox
              checkedIcon={
                <>
                  <Text>ASC </Text>
                  <MaterialCommunityIcons name="sort-ascending" size={25} />
                </>
              }
              uncheckedIcon={
                <>
                  <Text>DESC </Text>
                  <MaterialCommunityIcons name="sort-descending" size={25} />
                </>
              }
              checked={this.state.orderBy === 'ASC' ? true : false}
              onPress={() =>
                this.setState(
                  this.state.orderBy === 'ASC'
                    ? {orderBy: 'DESC'}
                    : {orderBy: 'ASC'},
                )
              }
            />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                onPress={this.handleFilter}
                rounded
                success
                style={{paddingHorizontal: 50, marginRight: 5}}>
                <Text>Apply</Text>
              </Button>
              <Button
                onPress={() => this.setState({overlay: false})}
                rounded
                danger
                style={{paddingHorizontal: 20, marginLeft: 5}}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </>
        </Overlay>
        <Container>
          <Header noShadow style={{backgroundColor: '#4267B2'}}>
            <Left>
              <Button transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="search" onPress={this.showSearch} />
              </Button>
              <Button transparent>
                <FontAwesome5
                  name="filter"
                  size={18}
                  style={{color: '#FFF'}}
                  onPress={() => this.setState({overlay: true})}
                />
              </Button>
            </Right>
          </Header>
          {showSearch === true ? (
            <>
              <Header
                searchBar
                rounded
                noShadow
                style={{backgroundColor: '#4267B2'}}>
                <Item>
                  <Icon name="ios-search" />
                  <Input placeholder="Search" onChangeText={this.search} />
                  <FontAwesome5
                    name="times"
                    size={20}
                    style={{marginRight: 10}}
                  />
                </Item>
                <Button transparent>
                  <Text>Search</Text>
                </Button>
              </Header>
              <Text>Result for {search}</Text>
            </>
          ) : (
            <></>
          )}
          <EngineersList />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  engineers: state.engineers,
});

const mapDispatchToProps = dispatch => ({
  fetch: api => dispatch(fetchEngineers(api)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Engineers);
