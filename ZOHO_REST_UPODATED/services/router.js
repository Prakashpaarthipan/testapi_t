const express = require('express');
const router = new express.Router();
const tasks = require('../controllers/tasks.js');

router.route('/taskid/:id?')
  .get(tasks.get);

router.route('/approve/:id?')
      .post(tasks.get);

router.route('/approvemulti/')
      .post(tasks.multi);

router.route('/getempTask/:name?')
      .get(tasks.getempTask);

module.exports = router;
