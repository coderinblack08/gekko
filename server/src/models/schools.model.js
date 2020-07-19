module.exports = function (app) {
  const modelName = 'schools';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    code: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      validate: {
        validator: value => {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.exec(value);
        },
        message: 'Email Invalid 📧'
      },
      required: true
    },
    url: {
      type: String,
      validate: {
        validator: value => {
          const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
          return regex.exec(value);
        },
        message: 'Please enter a valid 🔗'
      },
      required: true
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      validate: {
        validator: value => {
          return ['K-12','Higher Ed'].includes(value);
        },
        message: 'Please input a valid school type'
      },
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
