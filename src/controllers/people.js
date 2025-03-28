const PeopleModel = require('../models/people');

class PeopleController {
    static async createPerson(req, res) {
        try {
            const person = await PeopleModel.create(req.body);
            res.status(201).json(person);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getPeople(req, res) {
        try {
            const people = await PeopleModel.findAll(req.query);
            res.json(people);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deletePerson(req, res) {
        try {
            await PeopleModel.softDelete(req.params.id);
            res.status(204).end();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = PeopleController;