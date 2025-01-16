const passport = require("passport");
const queries = require("../db/queries");

exports.getIndex = (req, res) => {
    console.log("User: " + req.user);
    res.render("index", { user: req.user });
};

exports.getSignUp = (req, res) => {
    res.render("sign-up");
};

exports.postSignUp = (req, res) => {
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

exports.postLogIn = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
});

exports.getLogOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            return err;
        }
        res.redirect("/");
    });
};
