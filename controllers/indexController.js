const passport = require("passport");
const bcrypt = require("bcryptjs");
const queries = require("../db/queries");

exports.getIndex = (req, res) => {
    res.render("index", { user: req.user });
};

exports.getSignUp = (req, res) => {
    res.render("sign-up");
};

exports.postSignUp = (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                throw err;
            }
            queries.addUser(req.body.username, hashedPassword);
            res.redirect("/");
        });
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
