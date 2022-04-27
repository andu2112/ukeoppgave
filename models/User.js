const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;