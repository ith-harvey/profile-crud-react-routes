
import React, { Component } from 'react';
import marked from  'marked';
import PersonPicture from './PersonPicture'
import { Card, Col, Button, Row } from 'react-materialize'

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: '',
      profile_img_url: ''
    };

    //binding all our functions to this class
    this.deletePerson = this.deletePerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handlePersonUpdate = this.handlePersonUpdate.bind(this);
  }
  updatePerson(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({
      toBeUpdated: !this.state.toBeUpdated
    });
  }
  handlePersonUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let profile_img_url = (this.state.profile_img_url) ? this.state.profile_img_url : null;

    let person = {
      author: author,
      text: text,
      profile_img_url: profile_img_url
    };

    this.props.onPersonUpdate(id, person);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: '',
      profile_img_url: ''
    })
  }

  deletePerson(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onPersonDelete(id);
    console.log('oops deleted');
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleAuthorChange(e) {
    this.setState({
      author: e.target.value
    });
  }

  handleImageUpload({profile_img_url}) {
    console.log('on person edit!', profile_img_url );
    this.setState({ profile_img_url: profile_img_url })
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return {__html: rawMarkup};
  }
  render() {
    return (
        <Col s={4}>
          <Card title={this.props.author}>
            <img className="img-profile" src={this.props.profile_img_url} alt="Smiley face" />
            <h3>  </h3>
            <span dangerouslySetInnerHTML = {this.rawMarkup()} />
            <Row>
              <Col s={6}>
                <Button onClick = { this.updatePerson}>
                  update
                </Button>
              </Col>
              <Col s={6}>
                <Button onClick = { this.deletePerson}>
                 delete
                </Button>
              </Col>
            </Row>
           {(this.state.toBeUpdated) ? (<form onSubmit={this.handlePersonUpdate}>
            <input type = 'text' placeholder = 'Update name…'
            value = {this.state.author}
            onChange = {this.handleAuthorChange}
            />

            <input type = 'text' placeholder = 'Update your description…'
            value = {this.state.text}
            onChange = {this.handleTextChange}/>

            <PersonPicture onImageUpload = {this.handleImageUpload} />

            <input type = 'submit' value = 'Update' />
            </form>) : null}
          </Card>
        </Col>
    )
  }
}


export default Person;
