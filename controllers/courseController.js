const mongoDB= require("mongodb");
const { Courses, Topics } = require("../mongoConfig");

const addCourse = (req) => {
  return Courses.insertOne(req.body);
};

const getAllCourses = (req) => {
  const { page = 1, count = 10 } = req.query; // url?count=30&page=5 
  return Courses.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc");
};

const getCourseById = async(req) => {
  const courseId = new mongoDB.ObjectId(req.body.courseId);
  const courseData = await Courses.findOne({_id: courseId});
  const {curriculum} = courseData;
  const currPromise = curriculum.map(e => {
    const topicId = new mongoDB.ObjectId(e);
    return Topics.findOne({_id: topicId})
  });
  return Promise.allSettled(currPromise);
}


module.exports = { addCourse, getAllCourses,getCourseById };
