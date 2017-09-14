
import React, {Component} from 'react';
import PersonPicture from './PersonPicture';
import { Card, Row, Col, Button } from 'react-materialize'


class PersonForm extends Component {
  constructor(props) {
    super(props);

    this.state = { author: '', text: '', profile_img_url: '' };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    console.log('hopfully this is the URL!', this.state.uploadedFileCloudinaryUrl);
    let profile_img_url = this.state.profile_img_url;

    if (!text || !author) {
      return
    }

    this.props.onPersonSubmit({
      author: author,
      text: text,
      profile_img_url: profile_img_url
    });

    this.setState({ author: '', text: '', profile_img_url: ''});
  }

  handleImageUpload({profile_img_url}) {
    console.log('on PersonForm', profile_img_url );
    this.setState({ profile_img_url: profile_img_url })
  }

  render() {
    return (
      <Card>
        <Row>
          <form onSubmit = {this.handleSubmit}>
          <Col s={3}>
            <PersonPicture onImageUpload = {this.handleImageUpload} />
          </Col>

          <Col s={9}>
            <input type = 'text' placeholder = 'Your name…'
            value = { this.state.author}
            onChange = { this.handleAuthorChange} />

            <input type = 'text' placeholder = 'Say something…'
            value = { this.state.text }
            onChange = {this.handleTextChange}/>
          </Col>
            <Button type = 'submit'>Save</Button>
          </form>
        </Row>
      </Card>
    )
  }
}
export default PersonForm;
