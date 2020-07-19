const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const { setField } = require('feathers-authentication-hooks');
const { disallow } = require('feathers-hooks-common');

const internalOnly = disallow('external');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query._id'
});

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), limitToUser ],
    get: [ authenticate('jwt'), limitToUser ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'), authenticate('jwt'), limitToUser ],
    patch: [ hashPassword('password'), authenticate('jwt'), limitToUser ],
    remove: [ authenticate('jwt'), limitToUser ]
  },

  after: {
    all: [
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
