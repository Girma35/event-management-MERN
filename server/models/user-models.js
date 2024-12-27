const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
