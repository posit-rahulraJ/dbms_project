const db = require('../db');

exports.createEmployee = (req, res) => {
  try {
    const { id, name, salary, age } = req.body;
    const query = 'INSERT INTO employee (id, name, salary, age) VALUES (?, ?, ?, ?)';
    db.query(query, [id, name, salary, age], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      const newEmployee = { id, name, salary, age };
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.showAllEmployee = (req, res) => {
  try {
    const query = 'SELECT * FROM employee';
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.showEmployeeBasedOnID = (req, res) => {
  try {
    const query = 'SELECT * FROM employee WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateEmployee = (req, res) => {
  try {
    const { newName } = req.body;
    const query = 'UPDATE employee SET name = ? WHERE id = ?';
    db.query(query, [newName, req.params.id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee updated successfully', employee: { id: req.params.id, name: newName } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteEmployee = (req, res) => {
  try {
    const query = 'DELETE FROM employee WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully', employee: { id: req.params.id } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
