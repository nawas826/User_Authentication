const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Users", usersSchema);