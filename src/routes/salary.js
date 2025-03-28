const express = require('express');
const router = express.Router();
const SalaryController = require('../controllers/salary');

router.post('/:id', SalaryController.createSalary);
router.get('/:id', SalaryController.getSalaries);

module.exports = router;