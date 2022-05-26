import express from "express";
import path from "path";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

export default app;
