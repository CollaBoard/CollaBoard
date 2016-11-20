const Puid = require('puid');
const uuid = require('uuid');

const util = module.exports;

// Attach pick and map functions to Object and Array classes.
// eslint-disable-next-line
Object.pick = (...props) => obj => props.reduce((res, prop) => (res[prop] = obj[prop], res), {});
Array.map = fn => arr => arr.map(fn);

const puid = new Puid(false);
util.uid = uuid.v4;
util.uidShort = function uidShort() {
  return puid.generate();
};

util.logAndThrow = (err) => {
  console.log(err);
  throw err;
};


class NotFound extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 404;
  }
}

class BadRequest extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 400;
  }
}

class PermissionDenied extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 401;
  }
}

class UnexpectedError extends Error {
  constructor() {
    super();
    this.details = 'internal server error';
    this.statusCode = 500;
  }
}

const throwNew = Err => (details) => {
  throw new Err(details);
};

util.throwNotFound = throwNew(NotFound);
util.throwBadRequest = throwNew(BadRequest);
util.throwPermissionDenied = throwNew(PermissionDenied);
util.throwUnexpected = throwNew(UnexpectedError);
util.catchUnexpected = () => util.throwUnexpected();
util.rethrow = (err) => {
  if (err instanceof NotFound || err instanceof BadRequest || err instanceof PermissionDenied) {
    throw err;
  }
  util.throwUnexpected();
};

util.NotFound = NotFound;
util.BadRequest = BadRequest;
util.PermissionDenied = PermissionDenied;
util.UnexpectedError = UnexpectedError;
