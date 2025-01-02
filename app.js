const express = require("express");
const path = require("path");
const app = express();
require("dotenv");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
