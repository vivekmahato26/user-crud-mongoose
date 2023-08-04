const {Router} = require("express");
const {addCourse,getAllCourses,getCourseById} = require("../controllers/courseController");
const courseRouter = Router();

courseRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth && req.access !== "admin") throw new Error("Unauthenticated");
        const data = await addCourse(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

courseRouter.get("/all", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAllCourses(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})
courseRouter.get("/course", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getCourseById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

module.exports = courseRouter;