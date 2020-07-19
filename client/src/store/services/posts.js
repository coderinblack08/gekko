import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Post extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  static modelName = 'Post'
  static instanceDefaults() {
    return {
      title: '',
      description: '',
      type: '',
      event_date: '',
      school_id: ''
    }
  }
}

const servicePath = 'posts';
const servicePlugin = makeServicePlugin({
  Model: Post,
  service: feathersClient.service(servicePath),
  servicePath
});

export default servicePlugin;