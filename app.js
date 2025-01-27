//basic imports
require("dotenv").config();
const express = require("express");
const path = require("path");

//authentication imports
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//session store imports
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const queries = require("./db/queries");
const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//session setup
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        },
        secret: process.env.sessionSecret,
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//authentication setup
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
        const user = await queries.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

//middleware
app.use(async (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//routes
const habitRouter = require("./routes/habitRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/habit", habitRouter);
app.use("/", indexRouter);
app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
