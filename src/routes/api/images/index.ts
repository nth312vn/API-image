import express from "express";
import handleValidateImages from "../../../middleware/images";
import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { resError500 } from "../../../constant/http.constant";
import transformImage from "../../../utils/image";
const imageRoute = express.Router();

imageRoute.get("/", handleValidateImages, async (req, res) => {
  try {
    const { filename, width, height } = req.query;
    const widthNumber = Number(width);
    const heightNumber = Number(height);
    const pathFullImage = `${path.resolve(
      __dirname,
      `../../../assets/full/${filename}.jpg`
    )}`;
    const pathThumbImage = `${path.resolve(
      __dirname,
      `../../../assets/thumb/${filename}-thumb.jpg`
    )}`;
    if (!fs.existsSync(pathFullImage)) {
      return res.status(400).send({
        responseCode: 400,
        message: "Image is not found",
      });
    }
    if (fs.existsSync(pathThumbImage)) {
      const thumbData = await fsPromise.readFile(pathThumbImage);
      return res.status(200).contentType("jpg").send(thumbData);
    }
    const imageBuffer = await transformImage({
      width: widthNumber,
      height: heightNumber,
      pathFull: pathFullImage,
      pathThumb: pathThumbImage,
    });
    return res.status(200).contentType("jpg").send(imageBuffer);
  } catch (e) {
    return res.status(500).send(resError500);
  }
});
export default imageRoute;
