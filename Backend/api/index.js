// api/index.js
const app = require('../app')         // your Express setup
module.exports = (req, res) => app(req, res)
