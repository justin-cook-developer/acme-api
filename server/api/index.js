const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/departments', require('./departments'));

module.exports = router;
