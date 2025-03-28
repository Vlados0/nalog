const SalaryModel = require('../models/salary');

class SalaryController {
  static async createSalary(req, res) {
    try {
      const netSalary = parseFloat(req.body.net_salary);
      const result = await SalaryModel.create(netSalary, req.params.id);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getSalaries(req, res) {
    try {
      const salaries = await SalaryModel.findByPersonId(req.params.id);
      res.json(salaries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = SalaryController;