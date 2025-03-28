const pool = require('../config/db');

class SalaryModel {
  static async create(netSalary, personId) {
    const grossSalary = netSalary / 0.87;
    
    const { rows } = await pool.query(
      `WITH new_salary AS (
        INSERT INTO salary (net_salary, gross_salary)
        VALUES ($1, $2) 
        RETURNING salary_id
      )
      UPDATE people 
      SET salary_id = (SELECT salary_id FROM new_salary)
      WHERE id = $3 
      RETURNING *`,
      [netSalary, grossSalary, personId]
    );
    
    return rows[0];
  }

  static async findByPersonId(personId) {
    const { rows } = await pool.query(
      `SELECT s.* 
      FROM salary s
      JOIN people p ON s.salary_id = p.salary_id
      WHERE p.id = $1`,
      [personId]
    );
    return rows;
  }
}

module.exports = SalaryModel;