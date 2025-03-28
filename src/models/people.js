const pool = require('../config/db');

class PeopleModel {
  static async create(personData) {
    const { rows } = await pool.query(
      `INSERT INTO people 
      (last_name, first_name, middle_name, gender, age)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [
        personData.last_name,
        personData.first_name,
        personData.middle_name,
        personData.gender,
        personData.age
      ]
    );
    return rows[0];
  }

  static async findAll(filters) {
    let query = 'SELECT * FROM people WHERE deleted_at IS NULL';
    const params = [];
    const conditions = [];
    
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        if (key === 'last_name' || key === 'first_name') {
          conditions.push(`${key} ILIKE $${params.length + 1}`);
          params.push(`%${value}%`);
        } else {
          conditions.push(`${key} = $${params.length + 1}`);
          params.push(value);
        }
      }
    }

    if (conditions.length) {
      query += ` AND ${conditions.join(' AND ')}`;
    }

    const { rows } = await pool.query(query, params);
    return rows;
  }

  static async softDelete(id) {
    await pool.query(
      `UPDATE people 
      SET deleted_at = NOW() AT TIME ZONE 'Europe/Moscow'
      WHERE id = $1`,
      [id]
    );
  }
}

module.exports = PeopleModel;