const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const employeeRoutes = require('./routes/employeeRoutes'); // Assuming this is the correct path to your routing module

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123', // Replace 'abc123' with your MySQL password
  database: 'employeedb',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render createEmployee.ejs
app.get('/', (req, res) => {
  res.render('createEmployee');
});

// Create Employee Route
app.post('/employee/create', (req, res) => {
  try {
    console.log('Received data:', req.body);

    const { id, name, salary, age } = req.body;

    if (!id || !name || !salary || !age) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    db.query('INSERT INTO employee (id, name, salary, age) VALUES (?, ?, ?, ?)', [id, name, salary, age], (err, result) => {
      if (err) {
        console.error('Error inserting employee:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Employee created successfully', employee: { id, name, salary, age } });
      }
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Update Employee Route (GET)
app.get('/employee/update/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    // If id is missing, redirect to a different page or handle the error appropriately
    res.redirect('/employee/showAll');
    return;
  }

  // Retrieve the employee data from the database based on the id
  db.query('SELECT * FROM employee WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.length === 0) {
        // If employee with the specified id is not found, redirect to a different page or handle the error appropriately
        res.redirect('/employee/showAll');
        return;
      }
      // Render the updateEmployee.ejs file with the employee data
      res.render('updateEmployee', { employee: result[0] });
    }
  });
});


// Update Employee Route
app.post('/employee/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, salary, age } = req.body;
  db.query('UPDATE employee SET name = ?, salary = ?, age = ? WHERE id = ?', [name, salary, age, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      // Render the updateEmployee.ejs file with the updated employee data
      res.render('updateEmployee', { employee: { id, name, salary, age } });
    }
  });
});

// Update Employee Route
// app.get('/employee/update/:id', (req, res) => {
//   const { id } = req.params;
//   // Retrieve the employee data from the database based on the id
//   db.query('SELECT * FROM employee WHERE id = ?', [id], (err, result) => {
//     if (err) {
//       console.error('Error updating employee:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } else {
//       // Render the updateEmployee.ejs file with the employee data
//       res.render('updateEmployee', { employee: result[0] });
//     }
//   });
// });


// Delete Employee Route
// app.post('/employee/delete/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM employee WHERE id = ?', [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting employee:', err);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } else {
//       // Render the deleteEmployee.ejs file after deleting the employee
//       res.render('deleteEmployee', { id });
//     }
//   });
// });


// Delete Employee Route (GET)
app.get('/employee/delete/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    // If id is missing, redirect to a different page or handle the error appropriately
    res.redirect('/employee/showAll');
    return;
  }

  // Retrieve the employee data from the database based on the id
  db.query('SELECT * FROM employee WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving employee:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.length === 0) {
        // If employee with the specified id is not found, redirect to a different page or handle the error appropriately
        res.redirect('/employee/showAll');
        return;
      }
      // Render the deleteEmployee.ejs file with the employee data
      res.render('deleteEmployee', { employee: result[0] });
    }
  });
});

// Delete Employee Route
app.post('/employee/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employee WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Employee deleted successfully' });
    }
  });
});



// Show All Employees Route
app.get('/employee/showAll', (req, res) => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.render('showAllEmployees', { employees: result });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
