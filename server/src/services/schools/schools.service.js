// Initializes the `schools` service on path `/schools`
const { Schools } = require('./schools.class');
const createModel = require('../../models/schools.model');
const hooks = require('./schools.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/schools', new Schools(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('schools');

  service.hooks(hooks);
};
