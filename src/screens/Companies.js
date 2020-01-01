import React from 'react';
import {API_URL} from 'react-native-dotenv';
import {Container, Header, Icon, Button, Left, Title, Body} from 'native-base';
import {connect} from 'react-redux';
import CompaniesList from '../components/companies/CompaniesList';
import {Slider} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchCompanies} from '../public/redux/actions/companies';

class Companies extends React.Component {
  componentDidMount() {
    this.props.fetch(API_URL + '/api/v1/company/');
  }

  render() {
    return (
      <Container>
        <Header noShadow style={{backgroundColor: '#4267B2'}}>
          <Body>
            <Title style={{alignSelf: 'center'}}>Companies List</Title>
          </Body>
        </Header>
        <CompaniesList />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
});

const mapDispatchToProps = dispatch => ({
  fetch: api => dispatch(fetchCompanies(api)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Companies);
