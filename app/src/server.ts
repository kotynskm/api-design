import express from "express";
import morgan from "morgan";
import cors from "cors";

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

export default app;
