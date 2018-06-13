var express = require('express');
var asysncss = require('express-async-await');
var router = asysncss(express.Router()) ;
var register = require('../controllers/register');

router.get('/', register.register);
router.get('/student', register.student);
router.post('/student', register.student_submit);
router.get('/teacher', register.teacher);
router.post('/teacher', register.teacher_submit);
router.post('/emailcheck', register.emailcheck);
router.post('/usernamecheck', register.usernamecheck);
router.get('/success', register.success);
router.get('/reset_password', register.reset_password);
router.post('/reset_password', register.reset_password_post);
router.get('/varify', register.varify);
router.get('/varify_status', register.varify_status);
module.exports = router;