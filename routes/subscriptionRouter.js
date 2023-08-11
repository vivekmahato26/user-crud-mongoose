const {Router} = require("express");
const { subscribe, getSubscriptionById } = require("../controllers/subscriptionController");

const subscriptionRouter = Router();

subscriptionRouter.post("/add", async(req,res) => {
    try {
        const data = await subscribe(req);
        res.send(data);
    } catch (error) {
        res.send({err:error.message})
    }
})
subscriptionRouter.get("/:sId", async(req,res) => {
    try {
        const data = await getSubscriptionById(req);
        res.send(data);
    } catch (error) {
        res.send({err:error.message})
    }
})

module.exports = subscriptionRouter;