const { Subscriptions } = require("../mongoConfig");
const mongoDb = require("mongodb");
const Users = require("../model/userModel");
const { Courses } = require("../mongoConfig");

const subscribe = async (req) => {
  const data = await Subscriptions.insertOne(req.body);
  const sId = data.insertedId.toString();
  const studentUpdate = await Users.findByIdAndUpdate(req.body.userId, {
    $push: {
      subscriptions: sId,
    },
  });
  const courseId = new mongoDb.ObjectId(req.body.courseId);
  const courseUpdate = await Courses.findOneAndUpdate({ _id: courseId }, {
    $push: {
        students: sId
    }
  });
  return data;
};

const getSubscriptionById = (req) => {
  const sId = new mongoDb.ObjectId(req.params.sId);
  return Subscriptions.findOne({ _id: sId });
};

module.exports = { subscribe, getSubscriptionById };
