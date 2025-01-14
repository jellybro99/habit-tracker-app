const queries = require("../db/queries");

const getIndex = (req, res) => {
    res.render("index");
};

const getSignUp = (req, res) => {
    res.render("sign-up");
};

const postSignUp = (req, res) => {
    try {
        console.log("Request body:", req.body);
        queries.addUser(req.body.username, req.body.password);
        res.redirect("/");
    } catch (err) {
        console.error("Error during sign-up:", err);
        console.error("Error stack trace:", err.stack);
        res.status(500).send(
            "An error occurred during sign-up. Please try again."
        );
    }
};

module.exports = {
    getIndex,
    getSignUp,
    postSignUp,
};
