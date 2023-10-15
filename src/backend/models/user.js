const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    steamId: String,
    // Add any other fields you need
});

// Add the findOrCreate static method to the schema
userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    const userObj = new this(); // 'this' refers to the User model
    this.findOne({ steamId: profile.steamId }, (err, result) => {
        if (!result) {
            userObj.steamId = profile.steamId;
            // Add any other fields you need
            userObj.save(cb); // save the new user and execute the callback
        } else {
            cb(err, result); // return the found user and execute the callback
        }
    });
};

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the User model
