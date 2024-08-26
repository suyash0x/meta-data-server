import express from "express";

import { ENV } from "./configs/env.js";
import { ErrorMiddlewareService } from "./middlewares/error-middleware.js";

const ErrorMiddleware = new ErrorMiddlewareService();

const app = express();

app.listen(ENV.port, () => {
  console.log(`Meta data server started on ${ENV.port}`);
});

app.use(ErrorMiddleware.globalErrorHandler);

process.on("multipleResolves", (type, promise, reason) =>
  console.log({ message: "Detected multipleResolves", type, promise, reason })
);

process.on("unhandledRejection", (error, promise) =>
  console.log({ message: "Detected unhandledRejection", error, promise })
);

process.on("uncaughtExceptionMonitor", (error, origin) =>
  console.log({ message: "Detected uncaughtException", error, origin })
);
