const express = require("express");
const { createUser, logoutUser } = require("../controllers/auth.js");

const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.render('sign_up');
})
router.post('/sign-up', createUser);
router.get('/logout', logoutUser);


module.exports = router;