module.exports = function (app) {
  const modelName = 'members';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'users',
      required: true
    },
    school_id: {
      type: Schema.Types.ObjectId, 
      ref: 'schools',
      required: true
    }
  }, {
    timestamps: true
  });
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
