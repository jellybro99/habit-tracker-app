exports.getIndex = (req, res) => {
    res.render("habit/index");
};

exports.postNewHabit = async (req, res) => {
    res.redirect("/habit");
};
