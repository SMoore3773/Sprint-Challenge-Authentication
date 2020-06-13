/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret')
module.exports = (req, res, next) => {

  const [directive, token] = req.headers.authorization.split(' ');
  if(!directive || directive !== 'bearer'){
    res.status(401).json({error:"with directive middleware"})
  }
  if(token){
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken)=>{
      if(err){
        res.status(401).json({you:'shall not pass'})
      }
      else{
        req.decodedJWT = decodedToken;
      next();
    }
    })
  }else{
   res.status(401).json({ you: 'shall not pass!' }); 
  }
};
