const router = require('express').Router();
const Sequelize = require('sequelize');
const Student = require('../db/models/student');

router.get('/', async (req, res) => {
    const allStudents = await Student.findAll();
    res.json(allStudents);
});

router.get('/:id', async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (student){
        res.json(student);
    } else {
        next();
    }
});

router.post('/', async (req, res, next) => {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
});

router.put('/:id', async (req, res, next) => {
    Student.update({
        firstName: req.body.firstName
    }, {
        where: {
            id: req.params.id
        }
    });
    res.json(req.body);
});

router.delete('/:id', async (req, res, next) => {
    await Student.destroy({
        where: {
            id: req.params.id
        }
    });
    res.sendStatus(204);
});

router.use((err, req, res, next) => {
    if (err) {
        console.error(err);
    }
});

router.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;
