module.exports = function (app) {
  const modelName = 'posts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'schools'
    },
    type: {
      type: String,
      validate: {
        validator: value => {
          return ['update','event'].includes(value);
        },
        message: 'Please enter a valid type'
      },
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String
    }
  }, {
    timestamps: true
  });
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
