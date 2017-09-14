const express = require('express');
const router = express.Router();
const Person = require('../../model/people');

//retrieve all people from the database
router.get('/',function(req, res, next) {
  //looks at our person Schema
    Person.find(function(err, people) {
      if (err)
      res.send(err);
      //responds with a json object of our database people.
      res.json(people)
    });
  })


//post new person to the database
router.post('/',function(req, res, next) {
  console.log('in post');
    var newPerson = new Person({
      author : req.body.author,
      text : req.body.text,
      profile_img_url: req.body.profile_img_url
    });
    //body parser lets us use the req.body
    newPerson.save(function(err) {
     if (err) {
       res.send(err);
     } else {
       res.json({ message: 'Person successfully added!' });
     }
    });
});

//edit person in the database
router.put('/:id',function(req, res, next) {

  Person.findById(req.params.id, function(err, person) {
    if (err)
      res.send(err);

    //setting the new author and text to whatever was changed. If
    //nothing was changed we will not alter the field.

    (req.body.author) ? person.author = req.body.author : null;
    (req.body.text) ? person.text = req.body.text : null;
    (req.body.profile_img_url) ? person.profile_img_url = req.body.profile_img_url : null;

    //save person
    person.save(function(err) {
    if (err)
      res.send(err);

      res.json({ message: 'Person has been updated'});
    });
  });
})

//delete a person from our database
router.delete('/:id', function (req, res, next) {
  //selects the person by its ID, then removes it.
  Person.remove({ _id: req.params.id }, function(err, person) {
  if (err)
  res.send(err);
  res.json({ message: 'Person has been deleted' })
  })
});

module.exports = router;
