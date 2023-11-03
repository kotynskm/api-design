import app from "./server";
import router from "./router";
import * as dotenv from "dotenv";
import { protect } from "./utils/auth";

// to get env variables
dotenv.config();

app.listen(3001, () => {
  console.log("server started");
});

// mount the router
app.use("/api", protect, router);
