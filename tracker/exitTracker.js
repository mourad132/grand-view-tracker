const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
	id: String,
	time: String,
})

module.exports = mongoose.model("Exit Tracker", Schema)