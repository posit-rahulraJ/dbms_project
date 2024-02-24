const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/add', employeeController.createEmployee);
router.get('/showAll', employeeController.showAllEmployee);
router.get('/show/:id', employeeController.showEmployeeBasedOnID);
router.put('/update/:id', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);

module.exports = router;
