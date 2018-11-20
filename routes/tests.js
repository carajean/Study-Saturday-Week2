const router = require('express').Router();
const Sequelize = require('sequelize');
const Test = require('../db/models/test');
const Student = require('../db/models/student');

Test.belongsTo(Student, {
    through: 'student_test'
});
Student.hasMany(Test);

router.get('/', async (req, res, next) => {
    const allTests = await Test.findAll();
    res.json(allTests);
});

router.get('/:id', async (req, res, next) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
});

router.post('/student/:studentId', async (req, res, next) => {
    const test = await Test.create(req.body);
    test.update({
        studentId: +req.params.studentId
    });
    res.status(201).json(test);
});

router.delete('/:id', async (req, res, next) => {
    await Test.destroy({
        where: {
            id: req.params.id
        }
    });
});

module.exports = router;
