import request from "supertest";
import app from "..";
import fsPromise from "fs/promises";
import path from "path";

it("responds with 400 if called without parameters 1", (done) => {
  request(app)
    .get("/api/images?filename=test")
    .then((result) => {
      expect(result.status).toEqual(400);
      done();
    });
});

it("responds with 400 if called with a missing parameter 2", (done): void => {
  request(app)
    .get("/api/images?filename=test&height=100")
    .then((result) => {
      expect(result.status).toEqual(400);
      done();
    });
});
it("responds with 400 if called with invalid height", (done): void => {
  request(app)
    .get("/api/images?filename=test&height=-100&width=100")
    .then((result) => {
      expect(result.status).toEqual(400);
      done();
    });
});
it("responds with 400 if called with invalid width", (done): void => {
  request(app)
    .get("/api/images?filename=test&height=100&width=-100")
    .then((result) => {
      expect(result.status).toEqual(400);
      done();
    });
});

it("responds with 400 if called correctly but image does not exist", (done): void => {
  request(app)
    .get("/api/images?filename=abc&height=100&width=100")
    .then((result) => {
      expect(result.status).toEqual(400);
      done();
    });
});

it("created a thumb version of the image", (done) => {
  request(app)
    .get("/api/images?filename=test&height=100&width=100")
    .then(() => {
      fsPromise
        .stat(path.resolve(__dirname, "../../assets/thumb/test-thumb.jpg"))
        .then((fileStat) => expect(fileStat).not.toBeNull());
      done();
    });
});
