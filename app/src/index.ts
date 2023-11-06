import app from "./server";
import * as dotenv from "dotenv";

// to get env variables
dotenv.config();

app.listen(3001, () => {
  console.log("server started");
});
