const { enviromentFront } = require("../config/config")

function setHeaders(req, res, next) {
    res.header('Access-Control-Allow-Origin', enviromentFront); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, userid');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    next();
  };
  
  module.exports = setHeaders;