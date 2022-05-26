import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/todolist", {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected!!");
});
