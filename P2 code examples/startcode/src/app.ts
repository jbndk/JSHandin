import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
import friendsRoutes from "./routes/friendRoutesAuth";
const app = express()
const debug = require("debug")("app")
import { Request, Response, NextFunction } from "express"
import { ApiError } from "./errors/apiError";
var cors = require('cors')

app.use(express.json())

import logger, { stream } from "./middleware/logger";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
app.use(require("morgan")(morganFormat, { stream }));
logger.log("info", "Server started");

app.use((req, res, next) => {
  debug(
  "TIME:", new Date().toLocaleString(),",",
  "METHOD:", req.method,",",
  "URL:", req.url,",",
  "REMOTE IP:", req.ip,
  )
  next()
})

app.use(express.static(path.join(process.cwd(), "public")))

app.use("/api/friends", cors(), friendsRoutes)

app.get("/demo", cors(), (req, res) => {
  res.send("Server is up");
})

app.use("/api",  cors(), (req, res, next) => {
  res.status(404).json({errorCode: 404, msg: "Not found"})
})

app.use((err:any, req:Request, res:Response, next:Function) => {
  if(
    err instanceof (ApiError)) {
    const e = <ApiError>err
    if(e !== null) {
      const errorCode = e.errorCode ? e.errorCode : 500
    res.status(errorCode).json({errorCode: 404, msg: "Not found"})
    }
  } else {
    next(err)
  }
})

export default app;

