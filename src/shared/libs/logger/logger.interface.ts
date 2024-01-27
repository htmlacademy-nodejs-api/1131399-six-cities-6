type LoggerMethod = (message: string, ...args: unknown[]) => void;
type LoggerErrorMethod = (message: string, error: Error, ...args: unknown[]) => void;

export interface ILogger {
  info: LoggerMethod;
  warn: LoggerMethod;
  debug: LoggerMethod;
  error: LoggerErrorMethod;
}
