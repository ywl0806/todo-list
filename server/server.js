import express from "express";
import path from "path";
import cors from "cors";
import userRouter from "./router/userRouter";
import taskRouter from "./router/taskRouter";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24000 * 60 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );
app.use(morgan("dev"));
app.use(localMiddleware);
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
export default app;
