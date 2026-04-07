const express = require('express');
const upload = require('../middleware/upload');
const { scanReceipt } = require('../controllers/scanController');

const router = express.Router();

router.post('/', upload.single('receipt'), scanReceipt);

module.exports = router;
