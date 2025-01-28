const queries = require("../db/queries");

exports.getIndex = (req, res) => {
    res.render("habit/");
};

exports.getNewHabit = (req, res) => {
    res.render("habit/new");
};

exports.postNewHabit = async (req, res) => {
    queries.addHabit(req.user.id, req.body.habitName, req.body.icon);
    res.redirect("/habit");
};

exports.getHabit = (req, res) => {};
