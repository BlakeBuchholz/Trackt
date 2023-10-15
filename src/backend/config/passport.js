const SteamStrategy = require("passport-steam").Strategy;
const User = require("../models/user.js");

module.exports = function (passport) {
  passport.use(
    new SteamStrategy(
      {
        returnURL: "http://localhost:3001/auth/steam/return",
        realm: "http://localhost:3001/",
        apiKey: process.env.STEAM_API_KEY,
      },
      function (identifier, profile, done) {
        console.log("Steam authentication initiated...");
        const steamId = identifier.match(/\d+$/)[0]; // Extract the steamId from the identifier URL

        User.findOrCreate({ steamId: steamId }, function (err, user) {
          user.displayName = profile.displayName;

          // Save the updated user to the database
          user.save((saveErr) => {
            if (saveErr) return done(saveErr);
            return done(err, user);
          });
        });
      }
    )
  );
  console.log(__dirname);

  // Serialize user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.steamId);
  });

  // Deserialize user from the session
  passport.deserializeUser(function (steamId, done) {
    User.findOne({ steamId: steamId }, function (err, user) {
      done(err, user);
    });
  });
};
