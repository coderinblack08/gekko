import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class School extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  static modelName = 'School'
  static instanceDefaults() {
    return {
      name: '',
      email: '',
      url: '',
      location: '',
      type: ''
    }
  }
}

const servicePath = 'schools';
const servicePlugin = makeServicePlugin({
  Model: School,
  service: feathersClient.service(servicePath),
  servicePath
});

export default servicePlugin;