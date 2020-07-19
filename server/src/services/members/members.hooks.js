const mongoose = require('mongoose');

const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.user_id'
});

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ limitToUser ],
    get: [ limitToUser ],
    create: [
      async context => {
        const school = await mongoose.model('schools').findOne({
          code: context.data.code
        });
        const member = await mongoose.model('members').findOne({
          school_id: school._id,
          user_id: context.data.user_id
        });
        if(school && !member) {
          context.data.school_id = school._id;
          console.log(context.data);
          return context;
        } else {
          if(!school) {
            throw new Error('Code Inavlid!')
          } else if (member) {
            throw new Error('Already A Member')
          }
        }
      }
    ],
    update: [ limitToUser ],
    patch: [ limitToUser ],
    remove: [ limitToUser ]
  },

  after: {
    all: [],
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
};
