import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Forum extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  static modelName = 'Forum'
  static instanceDefaults() {
    return {
      school_id: '',
      title: '',
      question: ''
    }
  }
}

const servicePath = 'forums';
const servicePlugin = makeServicePlugin({
  Model: Forum,
  service: feathersClient.service(servicePath),
  servicePath
});

export default servicePlugin;