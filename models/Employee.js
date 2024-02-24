const db = require('../db');

const employeeSchema = {
  id: 'INT PRIMARY KEY',
  name: 'VARCHAR(255)',
  salary: 'DOUBLE',
  age: 'INT',
};

db.query(
  `CREATE TABLE IF NOT EXISTS employee (${Object.entries(employeeSchema)
    .map(([key, value]) => `${key} ${value}`)
    .join(', ')})`,
  (err) => {
    if (err) {
      console.error('Error creating employee table:', err);
    } else {
      console.log('Employee table created');
    }
  }
);

module.exports = employeeSchema;
