const { Topics, Courses } = require("../mongoConfig");
const mongoDb = require("mongodb");

const addTopic = async(req) => {
    const topicData = await Topics.insertOne(req.body);
    const topicId = topicData.insertedId.toString();
    const courseId = new mongoDb.ObjectId(req.body.courseId);
    return Courses.findOneAndUpdate({_id: courseId},{
        $push: {
            curriculum: topicId
        }
    });

}

const updateTopic = async (req) => {
    const topicId = new mongoDb.ObjectId(req.params.topicId);
    return Topics.findOneAndUpdate({_id:topicId},req.body,{new: true});
}

const deleteTopic = async(req) => {
    const topicId = new mongoDb.ObjectId(req.params.topicId);
    return Topics.findOneAndDelete({_id:topicId});
}
module.exports = {addTopic,updateTopic,deleteTopic};