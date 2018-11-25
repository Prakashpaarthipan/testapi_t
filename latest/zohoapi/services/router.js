const express = require('express');
const router = new express.Router();
const tasks = require('../controllers/tasks.js');

router.route('/taskid/:id?')
  .get(tasks.get);

router.route('/approve/:id?')
      .post(tasks.get);

router.route('/approvemulti/')
      .post(tasks.multi);

router.route('/getempTask/:name?/:approvedStatus?')
      .get(tasks.getempTask);

router.route('/projects/:name?')
      .get(tasks.getprojects);
	  
router.route('/projecttasks/:projectid?/:name?/:approvedStatus?')
  .get(tasks.getprojecttasks);
  
 router.route('/getuserdetails/:usercode?/:userpass?')
  .get(tasks.getuserdetails);
	  
module.exports = router;
