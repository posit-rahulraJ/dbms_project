// // controllers/employeeController.js

// // Temporary in-memory storage for employees
// let employeesData = [];

// exports.createEmployee = (req, res) => {
//   try {
//     const { id, name, salary, age } = req.body;
//     const newEmployee = { id, name, salary, age };
//     console.log('Received data:', { id, name, salary, age }); // Log the received data
//     employeesData.push(newEmployee);

//     res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.showAllEmployee = (req, res) => {
//   try {
//     res.status(200).json(employeesData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.showEmployeeBasedOnID = (req, res) => {
//   try {
//     const employee = employeesData.find(emp => emp.id === req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.status(200).json(employee);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.updateEmployee = (req, res) => {
//   try {
//     const { newName } = req.body;
//     const index = employeesData.findIndex(emp => emp.id === req.params.id);

//     if (index === -1) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     employeesData[index].name = newName;
//     res.status(200).json({ message: 'Employee updated successfully', employee: { id: req.params.id, name: newName } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.deleteEmployee = (req, res) => {
//   try {
//     const index = employeesData.findIndex(emp => emp.id === req.params.id);

//     if (index === -1) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const deletedEmployee = employeesData.splice(index, 1)[0];
//     res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
