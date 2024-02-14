const jwt = require('jsonwebtoken')
if(!process.env.HOST_DB) {
	config = require('../config_offline');
} else {
	config = require('../config_online');
}
const secret = process.env.SECRET_USER || config.token.secret_user;

const authentication = (req, res, next) =>{
    const token = req.headers["x-access-token"]
    // console.log(req.headers);
    if(token === undefined){
        res.json({status: 404, msg: "Error, token not found"})
    }else{
        jwt.verify(token, secret, (err, decoded) =>{
            if(err){
                res.json({status: 401, msg: "Error, your token is invalid!"})
            }else{
                req.email = decoded.email
                req.id = decoded.id
                next()
            }
        })
    }
}

module.exports = authentication