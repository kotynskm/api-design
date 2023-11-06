import express from "express";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./utils/auth";
import router from "./router";
import { createUser, signIn } from "./handlers/user";

// make the api
const app = express();

// custom middleware
const customLogger = (message) => (req, res, next) => {
  console.log(`The message is: ${message}`);
  next();
};

// for logging
app.use(morgan("dev"));
// so we can receive json
app.use(express.json());
// encodes/decodes query strings into an object
app.use(express.urlencoded({ extended: true }));
// allow talking to other resources
app.use(cors());

app.use(customLogger("this is from custom logger"));

app.get("/", (req, res) => {
  console.log("working!");
  res.status(200);
  res.json({ message: "hello" });
});

// mount the router
app.use("/api", protect, router);
// user routes
app.post("/user", createUser);
app.post("/signin", signIn);
export default app;
