require("dotenv").config();
const Express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const Auth = require("./middlewares/Auth");

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Auth);
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.ogjsn.mongodb.net:27017,cluster0-shard-00-01.ogjsn.mongodb.net:27017,cluster0-shard-00-02.ogjsn.mongodb.net:27017/fb2023?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
);

app.use("/users",userRouter); // http://localhost:4000/users/login


app.listen(4000, () => console.log("server running at port 4000"));
