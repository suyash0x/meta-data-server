import { ENV } from "../configs/env.js";

class MetaDataServerError extends Error {
  code;
  message;
  timestamp;
  constructor(code, message) {
    if (!message) {
      throw Error("message required");
    }

    super(message);
    this.code = code;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends MetaDataServerError {
  constructor(message) {
    if (!message) {
      throw Error("message required");
    }

    super(404, message);
  }
}

export class ConflictError extends MetaDataServerError {
  constructor(message) {
    if (!message) {
      throw Error("message required");
    }

    super(409, message);
  }
}

export class UnauthorizedError extends MetaDataServerError {
  constructor(message) {
    if (!message) {
      throw Error("message required");
    }

    super(401, message);
  }
}

export class ErrorMiddlewareService {
  globalErrorHandler(err, _req, res, _next) {
    if (err instanceof MetaDataServerError) {
      return res.status(err.code).json({
        message: err.message,
        timestamp: err.timestamp,
        stack: ENV.nodeEnv === "development" ? err.stack : undefined,
      });
    }

    return res.status(500).json({
      message: err.message,
      timestamp: err.timestamp,
      stack: ENV.nodeEnv === "development" ? err.stack : undefined,
    });
  }
}
