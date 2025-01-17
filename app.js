require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const queries = require("./db/queries");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            //console.log("Authenticating user: ", username);
            const user = await queries.getUserByUsername(username);
            if (!user) {
                console.log("no user");
                return done(null, false, { message: "Incorrect Username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log("incorrect password");
                return done(null, false, { message: "Incorrect Password" });
            }
            //console.log("User authenticated: ", user);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = queries.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const habitRouter = require("./routes/habitRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/habit", habitRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
