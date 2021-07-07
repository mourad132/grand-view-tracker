const express  =  require("express")
const app = express();
const mongoose = require("mongoose");
const enterTracker = require("./enterTracker.js");
const exitTracker = require("./exitTracker.js");
const moment = require("moment");
const User = require("./User.js");
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://kbibi:Mrgamer1017$@cluster0-pkbkj.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})

app.get("/track/:id", (req, res) => {
	res.render("auth-tracker.ejs", {id: req.params.id})
})

app.post("/enter/:id", (req, res) => {
	User.findOne({_id: req.params.id}, (err, found) => {
		if(err){
			console.log(err)
			res.send(err)
		} else {
			enterTracker.create({
				id: found._id,
				time: moment().add(2, "hours").format('h:mm a')
			})
		}
	})
})

app.post("/exit/:id", (req, res) => {
	User.findOne({_id: req.params.id}, (err, found) => {
		if(err){
			res.send(err)
		} else {
			exitTracker.create({
				id: found._id,
				time: moment().add(2, "hours").format('h:mm a')
			})
		}
	})
})

setInterval(() => {
	var time = moment().add(2, "hours").format('h:mm a')
	enterTracker.findOneAndDelete({time: time}, (err, deleted) => {
		if(err){
			res.send(err)
		}
	})
}, 3.6e+6)

app.listen(3000, () => console.log("server started"))