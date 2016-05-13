// http://stackoverflow.com/a/32749533/1096391

export class ApiGuardianError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class ValidationError extends ApiGuardianError {
  constructor(m) {
    super(m);
  }
}
