const { Router } = require("express");
const {addTopic,updateTopic,deleteTopic} = require("../controllers/topicsContoller");
const topicsRouter = Router();

topicsRouter.post("/add", async (req, res) => {
  try {
    if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
    const data = await addTopic(req);
    res.send(data);
  } catch (error) {
    res.send({ err: error.message });
  }
});
topicsRouter.patch("/:topicId", async (req, res) => {
  try {
    if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
    const data = await updateTopic(req);
    res.send(data);
  } catch (error) {
    res.send({ err: error.message });
  }
});
topicsRouter.delete("/:topicId", async (req, res) => {
  try {
    if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
    const data = await deleteTopic(req);
    res.send(data);
  } catch (error) {
    res.send({ err: error.message });
  }
});

module.exports = topicsRouter;
