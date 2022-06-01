import express from "express";
import {
  emailVerification,
  join,
  login,
  logout,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/join", join);
userRouter.get("/email_verification", emailVerification);
userRouter.get("/logout", logout);

export default userRouter;
