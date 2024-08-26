import { ENV } from "../configs/env.js";
import { UnauthorizedError } from "./error-middleware.js";

export class AuthenticationMiddleware {
  static isAuthorized(apiKey) {
    return apiKey === ENV.storageServersApiKey || apiKey === ENV.clientApiKey;
  }
  authenticateReq(req, _res, next) {
    try {
      const apiKey = req.header("Api-Key");

      // If not authorized throw error
      if (!AuthenticationMiddleware.isAuthorized(apiKey)) {
        const msg = "You are not authorized to access this resource";
        throw new UnauthorizedError(msg);
      }

      next();
    } catch (err) {
      next(err);
    }
  }
}
