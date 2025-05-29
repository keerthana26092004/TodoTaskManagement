
// const express = require("express");
// const router = express.Router();

// const { register, login } = require("../controllers/userController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login, oauthLogin } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

// ✅ This must exist
router.post('/oauth-login', oauthLogin);

module.exports = router;
