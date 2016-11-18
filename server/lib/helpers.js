const Puid = require('puid');
const uuid = require('uuid');

const helpers = module.exports;

// Attach pick and map functions to Object and Array classes.
// eslint-disable-next-line
Object.pick = (...props) => obj => props.reduce((res, prop) => (res[prop] = obj[prop], res), {});
Array.map = fn => arr => arr.map(fn);

const puid = new Puid(false);
helpers.uid = uuid.v4;
helpers.uidShort = function uidShort() {
  return puid.generate();
};

helpers.logAndThrow = (err) => {
  console.log(err);
  throw err;
};

helpers.NotFound = class NotFound extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 404;
  }
};

helpers.BadRequest = class BadRequest extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 400;
  }
};

helpers.BadRequest = class PermissionDenied extends Error {
  constructor(details) {
    super();
    this.details = details;
    this.statusCode = 403;
  }
};
