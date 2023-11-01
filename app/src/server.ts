import express from "express";

// make the api
const app = express();

app.get("/", (req, res) => {
  console.log("working!");
  res.status(200);
  res.json({ message: "hello" });
});
export default app;
