module.exports = function (app) {
  const modelName = 'forums';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'schools'
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    title: {
      type: String,
      required: true
    },
    importance: {
      type: Number,
      validate: {
        validator: value => {
          return value>0&&value<=3;
        },
        message: 'Please enter a valid importance number'
      },
      required: true
    },
    question: {
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
