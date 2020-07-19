const users = require('./users/users.service.js')
const schools = require('./schools/schools.service.js');
const members = require('./members/members.service.js');
const posts = require('./posts/posts.service.js');
const forums = require('./forums/forums.service.js');
const answers = require('./answers/answers.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(schools);
  app.configure(members);
  app.configure(posts);
  app.configure(forums);
  app.configure(answers);
}
