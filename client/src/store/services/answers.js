import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Answer extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  static modelName = 'Answer'
  static instanceDefaults() {
    return {
      forum_id: '',
      answer: ''
    }
  }
}

const servicePath = 'answers';
const servicePlugin = makeServicePlugin({
  Model: Answer,
  service: feathersClient.service(servicePath),
  servicePath
});

export default servicePlugin;