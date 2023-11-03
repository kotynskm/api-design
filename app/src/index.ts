import app from "./server";
import router from "./router";

app.listen(3001, () => {
  console.log("server started");
});

// mount the router
app.use("/api", router);
