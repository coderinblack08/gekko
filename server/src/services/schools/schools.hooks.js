const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query.user_id'
});

const setUserId = setField({
  from: 'params.user._id',
  as: 'data.user_id'
});

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ 
      setUserId,
      async context => {
        context.data.code = nanoid(10);
        return context;
      }
    ],
    update: [ limitToUser ],
    patch: [ limitToUser ],
    remove: [ limitToUser ]
  },

  after: {
    all: [],
    find: [
      async context => {
        const members = mongoose.model('members');
        const userMembers = await members.find({
          user_id: context.params.user._id
        });
        context.result.data = context
          .result
          .data
          .reduce((schools, school) => {
            if(userMembers.find(member => member.school_id.equals(school._id))){
              schools.push(school);
            }
            return schools;
          }, []);
        return context;
      }
    ],
    get: [],
    create: [
      async context => {
        try {
          const result = await context.app.service('members').create({
            user_id: context.params.user._id,
            code: context.result.code
          });
        } catch (error) {
          console.error(error);
        }
        return context;
      }
    ],
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
