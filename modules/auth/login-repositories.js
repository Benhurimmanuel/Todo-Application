const User = require('./login-model');
const { v4: uuidv4 } = require('uuid');
const addNewUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (user) return user;


  const newUser = {
    googleId: profile.id,
    displayName: profile.given_name,
    fullName: profile.name,
    verified_email: profile.verified_email,
    image: profile.picture,
  };
  user = await User.create(newUser);
  return user;
};

module.exports = addNewUser;
