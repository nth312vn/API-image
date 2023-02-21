import express from "express";
import apiRoute from "./routes/api";

const app = express();

app.use("/api", apiRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`server listen in ${port}`);
});
