const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'employeesData.json');
let employeesData = []; // Initialize the employeesData array

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load employee data from file on server start
async function loadEmployeesData() {
  try {
    await fs.access(dataFilePath);
    const data = await fs.readFile(dataFilePath, 'utf-8');
    employeesData = JSON.parse(data) || [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await saveEmployeesData();
    } else {
      console.error('Error loading employee data:', error);
    }
  }
}

// Save employee data to file
async function saveEmployeesData() {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(employeesData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving employee data:', error);
  }
}

// Load initial employee data on server start
loadEmployeesData();

// Render createEmployee.ejs
app.get('/', (req, res) => {
  res.render('createEmployee');
});

// Create Employee Route
app.post('/employee/create', (req, res) => {
  try {
    const { id, name, salary, age } = req.body;
    const newEmployee = { id, name, salary, age };
    console.log('Received data:', { id, name, salary, age });
    employeesData.push(newEmployee);
  
    // Save updated data to file
    saveEmployeesData();
  
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Show All Employees Route
app.get('/employee/showAll', (req, res) => {
    res.status(200).json({ employees: employeesData });
  });
  


// app.get('/employee/delete/:id', (req, res) => {
//   try {
//     const index = employeesData.findIndex(emp => emp.id === req.params.id);
//     if (index === -1) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     const deletedEmployee = employeesData.splice(index, 1)[0];
  
//     // Save updated data to file
//     saveEmployeesData();
  
//     res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Render deleteEmployee.ejs
// app.get('/employee/delete/:id', (req, res) => {
//   res.render('deleteEmployee', { employeeId: req.params.id });
// });
// Render deleteEmployee.ejs
app.get('/employee/delete/:id', (req, res) => {
    const employeeId = req.params.id;
    const employee = findEmployeeById(employeeId);
  
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
  
    res.render('deleteEmployee', { employee });
  });
  

  // Modify this part to handle both query parameter and route parameter
  app.get('/employee/delete/:id', (req, res) => {
    const employeeId = req.params.id || req.query.id; // Use the query parameter if provided
    const employee = findEmployeeById(employeeId);
    res.render('deleteEmployee', { employee });
  });
  


// Delete Employee Route
app.post('/employee/delete/:id', (req, res) => {
    try {
      const { id } = req.params;
  
      const index = employeesData.findIndex(emp => emp.id === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Delete employee data
      const deletedEmployee = employeesData.splice(index, 1)[0];
  
      // Save updated data to file
      saveEmployeesData();
  
      res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
  
  // Helper function to prompt for employee ID before deleting
  function promptForDeleteEmployeeId() {
    const employeeId = prompt("Enter Employee ID to delete:");
  
    if (employeeId) {
      window.location.href = `/employee/delete/${employeeId}`;
    } else {
      alert("Employee ID is not provided. Deletion canceled.");
    }
  }
  



// Render updateEmployee.ejs
app.get('/employee/update/:id', (req, res) => {
    const employee = findEmployeeById(req.params.id);

    // Check if the employee exists
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    res.render('updateEmployee', { employee });
});

  
  // Modify this part to handle both query parameter and route parameter
  app.get('/employee/update/:id', (req, res) => {
    const employeeId = req.params.id || req.query.id; // Use the query parameter if provided
    const employee = findEmployeeById(employeeId);
    res.render('updateEmployee', { employee });
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
  
      // Save updated data to file
      saveEmployeesData();
  
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
