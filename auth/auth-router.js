const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const {isValid} = require('./valid-check');
const authDb = require('./authModel')

router.post('/register', (req, res) => {
  // implement registration

  const creds = req.body;
  if(isValid(creds)){
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(creds.password, rounds)
    creds.password = hash;
    authDb.add(creds)
    .then(user=>{
      res.status(201).json({data:user})
    })
    .catch(err =>{
      res.status(500).json({message:"error in adding user", reason: err.message})
    })
  }else{
    res.status(400).json({message:"please provide valid username and password to register"})
  }
});

router.post('/login', (req, res) => {
  // implement login

  const {username, password} = req.body;
  if(isValid(req.body)){
    authDb.findBy({username:username})
    .then(([user])=>{
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({message:'welcome', token})
      }else{
        res.status(401).json({message:"invalid credentials"})
      }
    })
    .catch(err=>{
      res.status(500).json({message:"error logging into server", reason:err})
    })
  }else{
    res.status(401).json({message:"please provide valid username and password"})
  }
});


function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn:'2h'
  };
return jwt.sign(payload, secret.jwtSecret, options)

}

module.exports = router;
