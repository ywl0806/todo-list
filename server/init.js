import "dotenv/config";
import dotenv from "dotenv";
import app from "./server";
import path from "path";
import "./db";
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.join(__dirname, "..", ".env.production") });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
} else {
  throw new Error("process.env.NODE_ENV를 설정하지 않았습니다!");
}

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
