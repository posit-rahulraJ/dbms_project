const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));

let employeesData = [];

// Create Employee Route
app.post('/employee/create', (req, res) => {
  try {
    const { id, name, salary, age } = req.body;
    const newEmployee = { id, name, salary, age };
    console.log('Received data:', { id, name, salary, age });
    employeesData.push(newEmployee);

    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Show All Employees Route
app.get('/employee/showAll', (req, res) => {
  res.render('showAllEmployees', { employees: employeesData });
});

// Delete Employee Route
app.get('/employee/delete/:id', (req, res) => {
  try {
    const index = employeesData.findIndex(emp => emp.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const deletedEmployee = employeesData.splice(index, 1)[0];
    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Render deleteEmployee.ejs
app.get('/employee/delete/:id', (req, res) => {
  res.render('deleteEmployee', { employeeId: req.params.id });
});


// Render updateEmployee.ejs
app.get('/employee/update/:id', (req, res) => {
    res.render('updateEmployee', { employee: findEmployeeById(req.params.id) });
  });
  
  // Update Employee Route
  app.post('/employee/update/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { name, salary, age } = req.body;
  
      const index = employeesData.findIndex(emp => emp.id === id);
  
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Update employee data
      employeesData[index] = { id, name, salary, age };
  
      res.status(200).json({ message: 'Employee updated successfully', employee: employeesData[index] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Helper function to find an employee by ID
  function findEmployeeById(id) {
    return employeesData.find(emp => emp.id === id);
  }  

// Render createEmployee.ejs
app.get('/', (req, res) => {
  res.render('createEmployee');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
