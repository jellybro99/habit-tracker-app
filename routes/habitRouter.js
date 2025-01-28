const { Router } = require("express");
const habitController = require("../controllers/habitController");

const habitRouter = Router();

habitRouter.get("/", habitController.getIndex);

habitRouter.get("/new", habitController.getNewHabit);

habitRouter.post("/new", habitController.postNewHabit);

habitRouter.get("/:id", habitController.getHabit); // might change to using the habit name instead of id

module.exports = habitRouter;
