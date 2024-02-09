import { NextFunction, Request, Response } from "express";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors } = format;

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json(),
    printf(({ level, message, timestamp, stack }) => {
      const text = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      return stack ? text + "\n" + stack : text;
    }),
    errors({ stack: true })
  ),
  defaultMeta: {
    package: "server",
  },
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
});

/**
 * This function is used by express as a middleware.
 * @example
 *   this.app = express()
 *   this.app.use(expressRequestLogger)
 */
export function expressRequestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const unwantedLogURLs = ["/api/v1/node-icon/"];
  if (
    req.url.includes("/api/v1/") &&
    !unwantedLogURLs.some((url) => req.url.includes(url))
  ) {
    const fileLogger = createLogger({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json(),
        errors({ stack: true })
      ),
      defaultMeta: {
        package: "server",
        request: {
          method: req.method,
          url: req.url,
          body: req.body,
          query: req.query,
          params: req.params,
          headers: req.headers,
        },
      },
      transports: [new transports.Console()],
    });

    const getRequestEmoji = (method: string) => {
      const requetsEmojis: Record<string, string> = {
        GET: "⬇️",
        POST: "⬆️",
        PUT: "🖊",
        DELETE: "❌",
        OPTION: "🔗",
      };

      return requetsEmojis[method] || "?";
    };

    if (req.method !== "GET") {
      fileLogger.info(
        `${getRequestEmoji(req.method)} ${req.method} ${req.url}`
      );
      logger.info(`${getRequestEmoji(req.method)} ${req.method} ${req.url}`);
    } else {
      fileLogger.http(
        `${getRequestEmoji(req.method)} ${req.method} ${req.url}`
      );
    }
  }

  next();
}

export default logger;
