/* eslint-disable linebreak-style */
const {
  getGoogleAuthURLService,
  getGoogleUserService,
  userStorageService,
} = require('./login-service');
const jwt = require('jsonwebtoken');

const googleAuthController = (req, res, next) => {
  try {
    const googleAuthService = getGoogleAuthURLService();
    res.redirect(googleAuthService);
  } catch (error) {
    next(error);
  }
};

const getUserDetailsController = async (req, res, next) => {
  try {
    const { code } = req.query;
    const userProfile = await getGoogleUserService(code);
    const user = await userStorageService(userProfile);

      if (user.status) {
      req.session.user = user.data;
      res.redirect("/")
    }
  } catch (error) {
    next(error);
  }
};
// 


module.exports = { googleAuthController, getUserDetailsController };
