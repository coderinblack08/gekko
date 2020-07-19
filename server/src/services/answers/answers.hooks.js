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
    create: [ setUserId ],
    update: [ limitToUser ],
    patch: [ limitToUser ],
    remove: [ limitToUser ]
  },

  after: {
    all: [],
    find: [
      async context => {
        const userIds = [...new Set(context.result.data.map(post => post.user_id.toString()))];
        const users = await context
          .app
          .service('users')
          .find({
            paginate: false,
            query: {
              _id: {
                $in: userIds,
              },
            }
          });
        const usersById = users.reduce((byId, user) => {
          byId[user._id] = user;
          return byId;
        }, {});
        context.result.data.forEach(post => {
          post.user = usersById[post.user_id].name;
        });
        return context;
      } 
    ],
    get: [],
    create: [
      async context => {
        context.result.user = await context.app.service('users').get(context.result.user_id);
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
