const express = require('express');
const router = express.Router();
const { createCollege, getCollege } = require('../controllers/collegeController');
const { createInterns } = require('../controllers/internController');

router.post('/functionup/colleges', createCollege);
router.get('/functionup/collegeDetails', getCollege);
router.post('/functionup/interns', createInterns);

module.exports = router; 
