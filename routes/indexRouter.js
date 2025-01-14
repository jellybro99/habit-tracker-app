const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/sign-up", indexController.getSignUp);

indexRouter.post("/sign-up", indexController.postSignUp);

indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;
