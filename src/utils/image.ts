import fsPromise from "fs/promises";
import sharp from "sharp";
export interface ITransformImage {
  width: number;
  height: number;
  pathFull: string;
  pathThumb: string;
}
const transformImage = async ({
  width,
  height,
  pathFull,
  pathThumb,
}: ITransformImage) => {
  const data = await fsPromise.readFile(pathFull);
  const imageBuffer = await sharp(data).resize(width, height).toBuffer();
  await fsPromise.writeFile(pathThumb, imageBuffer);
  return imageBuffer;
};
export default transformImage;
