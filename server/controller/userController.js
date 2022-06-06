import User from "../model/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { send } from "process";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.log("email is not exists");
    return res.json({
      ok: false,
      message:
        "メールアドレスが存在しません。\nメールアドレスを確認してください。",
    });
  }

  const go = await bcrypt.compare(password, user.password);

  if (!go) {
    console.log("password is not equal");
    return res.json({
      ok: false,
      message: "パスワードが一致しません。",
    });
  }

  if (!user.email_verified) {
    console.log("Email not authenticated");
    const authUrl = `http://${req.headers.host}/user/email_verification?key=${user.key_for_verify}`;
    const mailText = `${user.name}さん<br/>こんにちは!<br/><br/>こちらのURLから進んでください。<br/> ${authUrl}`;
    sendMail(user.email, mailText);
    return res.json({
      ok: false,
      message: `メールアドレス認証がされてないです。\n${user.email}\nこちらのメールアドレスに認証メールを送ります。`,
    });
  }

  console.log("login success");
  req.session.user = user;
  req.session.loggedIn = true;

  console.log(req.session);

  return res.json({
    message: "login success",
    ok: true,
    user: {
      name: user.name,
      email: user.email,
      _id: user._id,
      avatarUrl: user.avater_url || "",
    },
  });
};

export const logout = (req, res) => {
  req.session.destroy;
  console.log("logout");
  return res.json({
    message: "session destroy",
  });
};
export const join = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  console.log(req.body);

  if (password !== passwordConfirm) {
    console.log("password is not equal");
    return;
  }

  const exists = await User.exists({ $or: [{ email }] });

  if (exists) {
    console.log("email already exists");
    return res.json({
      ok: false,
      message: "既に登録されたメールアドレスがあります。",
    });
  }

  const key_for_verify = crypto.randomBytes(8).toString("hex");
  const authUrl = `http://${req.headers.host}/user/email_verification?key=${key_for_verify}`;
  const mailText = `${name}さん<br/>こんにちは!<br/><br/>こちらのURLから進んでください。<br/> ${authUrl}`;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      key_for_verify,
    });
    sendMail(email, mailText);

    return res.json({
      message: "pls check mail",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const emailVerification = async (req, res) => {
  const { key } = req.query;
  const user = await User.findOneAndUpdate(
    { key_for_verify: key },
    { email_verified: true }
  );
  if (user === null) {
    return;
  }
  // 既にmail認証済みのuser
  if (user.email_verified == true) {
    //homeへ移動
    return res.redirect("/");
  }
  const url = `http://${req.headers.host}`;
  const mailText = `${user.name}さん<br/>ようこそ！！<br/> 登録が終わりました。<br/><br/>${url} `;
  sendMail(user.email, mailText);
  return res.redirect("/");
};

const sendMail = (email, mailText) => {
  const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject: "TO-DO List",
    html: mailText,
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
  transpoter.close();
};
