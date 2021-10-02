
const express = require('express');
const router = express.Router();
const {
  googleAuthController,
  getUserDetailsController,
} = require('./login-controllers');


router.get('/google', googleAuthController);
router.get('/google/callback', getUserDetailsController);
router.get('/logout', (req, res) => {
  delete req.session.user;
  res.redirect('/auth/google')
});
module.exports = router;

