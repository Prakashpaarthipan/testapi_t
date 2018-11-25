const express = require('express');
const router = new express.Router();
const employees = require('../controllers/employees.js');

router.route('/employees/')
  .get(employees.get);

router.route('/approve/')
    .get(employees.get);

module.exports = router;
