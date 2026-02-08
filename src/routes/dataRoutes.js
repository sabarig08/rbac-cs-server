const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

router.get('/secret', auth, rbac(['view_secret']), dataController.getSecretData);

module.exports = router;
