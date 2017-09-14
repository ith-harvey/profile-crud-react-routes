
import React, { Component } from 'react';
import Person from './Person';
import { Row } from 'react-materialize'

class PeopleList extends Component {
  render() {
    let peopleNodes = this.props.data.map(person => {
      return (
        <Person author={ person.author }
        profile_img_url={ person.profile_img_url }
        uniqueID={ person['_id'] }
        onPersonDelete={ this.props.onPersonDelete }
        onPersonUpdate={ this.props.onPersonUpdate }
        key={ person['_id']} >
        { person.text }
        </Person>
      )
    })

    return (
      <Row>
        { peopleNodes }
      </Row>
    )
  }

}

export default PeopleList;
