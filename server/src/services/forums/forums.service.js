// Initializes the `forums` service on path `/forums`
const { Forums } = require('./forums.class');
const createModel = require('../../models/forums.model');
const hooks = require('./forums.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/forums', new Forums(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('forums');

  service.hooks(hooks);
};
