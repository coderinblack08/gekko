module.exports = function (app) {
  const modelName = 'users'
  const mongooseClient = app.get('mongooseClient')
  const schema = new mongooseClient.Schema({
    name: {
      type: String,
      required: true
    },
    email: { 
      type: String, 
      unique: true, 
      required: true
    },
    password: { 
      type: String,
      required: true 
    }
  }, {
    timestamps: true
  })
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName)
  }
  return mongooseClient.model(modelName, schema)
}
