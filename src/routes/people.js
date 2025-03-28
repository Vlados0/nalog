const express = require('express');
const router = express.Router();
const PeopleController = require('../controllers/people');

router.post('/', PeopleController.createPerson);
router.get('/', PeopleController.getPeople);
router.delete('/:id', PeopleController.deletePerson);

module.exports = router;