const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String},
    createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;