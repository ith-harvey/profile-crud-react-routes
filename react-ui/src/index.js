
import React from 'react';
import ReactDOM from 'react-dom';
import PeopleBox from './components/PeopleBox';

ReactDOM.render(
   <PeopleBox url='https://profile-crud-react-routes.herokuapp.com/api/people' pollInterval={2000} />,
 document.getElementById('root')
);
