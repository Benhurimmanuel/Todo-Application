
const { google } = require('googleapis');
const fetch = require('node-fetch');
// const addNewUser = require('./login-repositories');s
const firestoreWrapper = require('./login-firestore');


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */

  'http://127.0.0.1:3000/auth/google/callback',
);

function getGoogleAuthURLService() {
  /*
   * Generate a url that asks permissions to the user's email and profile
   */
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes, // If you only need one scope you can pass it as string
  });
}

async function getGoogleUserService(code) {
  const { tokens } = await oauth2Client.getToken(code);
  // Fetch the user's profile with the access token and bearer
  const googleUser = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${tokens.id_token}`,
      },
    },
  );
  const json = await googleUser.json();
  return json;
}

const userStorageService = async (profile) => {
  const userProfileStorage = await firestoreWrapper.AddUser(profile);
  return userProfileStorage;
};

module.exports = {
  getGoogleAuthURLService,
  getGoogleUserService,
  userStorageService,
};
