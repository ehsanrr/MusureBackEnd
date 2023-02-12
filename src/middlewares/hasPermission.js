const User = require('../servicesAPI/users/model')

function hasPermission (perm) {

  return async(req, res, next) => {

    try {
      const user = await User.findById(req.headers.userid);
      if(perm === 'admin' && user.role === 'admin'){
        return next()
      }
      if(perm === 'user' && (user.role === 'admin' || user.role === 'user')){
        return next()
      }
      if(perm === 'public'){
        return next()
      }
      return res.status(403).send('You have no access')
      
    } catch (error) {
      next(error)
    }

  }
};
  
module.exports = hasPermission;