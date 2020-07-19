module.exports = function (app) {
  const modelName = 'answers';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    forum_id: { 
      type: Schema.Types.ObjectId,
      ref: 'forums' 
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    answer: {
      type: String,
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
