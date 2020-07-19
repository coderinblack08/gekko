import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Member extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  static modelName = 'Member'
  static instanceDefaults() {
    return {
      code: '',
      user_id: ''
    }
  }
}

const servicePath = 'members';
const servicePlugin = makeServicePlugin({
  Model: Member,
  service: feathersClient.service(servicePath),
  servicePath
});

export default servicePlugin;