import { Request, Response } from "express";
import { resError500 } from "../../constant/http.constant";

const handleValidateImages = (req: Request, res: Response, next: Function) => {
  try {
    const { filename, width, height } = req.query;

    if (![filename, width, height].every(Boolean)) {
      return res.status(400).send({
        responseCode: 400,
        message: "Missing parameters",
      });
    }
    if ([width, height].some((item) => Number(item) <= 0)) {
      return res.status(400).send({
        responseCode: 400,
        message: "Width height is invalid",
      });
    }
    next();
  } catch (e) {
    return res.status(500).send(resError500);
  }
};
export default handleValidateImages;
