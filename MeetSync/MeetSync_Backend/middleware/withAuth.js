const jwt = require('jsonwebtoken')
const secret = "fsjs30" //TODO stocké dans env

const withAuth = (req, res, next) =>{
    const token = req.headers["x-access-token"]

    if(token === undefined){
        res.json({status: 404, msg: "Error, token not found"})
    }else{
        jwt.verify(token, secret, (err, decoded) =>{
            if(err){
                res.json({status: 401, msg: "Error, your token is invalid!"})
            }else{
                req.id = decoded.id
                next()
            }
        })
    }
}

module.exports = withAuth