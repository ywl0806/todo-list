import "dotenv/config";
import app from "./server";
import "./db";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
