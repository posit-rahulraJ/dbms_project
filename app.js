const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/employee', employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
