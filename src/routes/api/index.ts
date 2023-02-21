import express from "express";
import imageRoute from "./images";

const apiRoute = express.Router();

apiRoute.use("/images", imageRoute);

export default apiRoute;
