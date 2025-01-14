const { Router } = require("express");
const habitController = require("../controllers/habitController");

const habitRouter = Router();

habitRouter.get("/", habitController.getIndex);

module.exports = habitRouter;
