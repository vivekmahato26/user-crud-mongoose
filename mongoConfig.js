const { MongoClient } = require("mongodb");

const client = new MongoClient(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.ogjsn.mongodb.net:27017,cluster0-shard-00-01.ogjsn.mongodb.net:27017,cluster0-shard-00-02.ogjsn.mongodb.net:27017/edtechClass?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);

const db = client.db();

const Courses = db.collection("Courses");
const Topics = db.collection("Topics");
const Subscriptions = db.collection("Subscriptions");
const Payment = db.collection("Payment");

module.exports = { Courses, Topics, Subscriptions, Payment };
