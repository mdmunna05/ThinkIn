/**
 * Simple logging utility
 */

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Use conditional runtime check instead of compile-time __DEV__
const currentLogLevel = LogLevel.WARN;

const formatLog = (level: string, message: string, data?: any): void => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${level}: ${message}`;
  
  if (data) {
    console.log(logMessage, data);
  } else {
    console.log(logMessage);
  }
};

export const logger = {
  debug: (message: string, data?: any) => {
    if (currentLogLevel <= LogLevel.DEBUG) {
      formatLog('DEBUG', message, data);
    }
  },
  
  info: (message: string, data?: any) => {
    if (currentLogLevel <= LogLevel.INFO) {
      formatLog('INFO', message, data);
    }
  },
  
  warn: (message: string, data?: any) => {
    if (currentLogLevel <= LogLevel.WARN) {
      formatLog('WARN', message, data);
    }
  },
  
  error: (message: string, data?: any) => {
    if (currentLogLevel <= LogLevel.ERROR) {
      formatLog('ERROR', message, data);
    }
  },
};
