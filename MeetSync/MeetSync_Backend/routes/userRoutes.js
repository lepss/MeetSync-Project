const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authentication = require("../middleware/authentication")
if(!process.env.HOST_DB) {
	config = require('../config_offline');
} else {
	config = require('../config_online');
}
const secret = process.env.SECRET_USER || config.token.secret_user;

module.exports = (app, db) =>{
    const UserModel = require("../models/UserModel")(db)
    const CompanyModel = require("../models/CompanyModel")(db)

    app.post("/api/user/save", async (req, res, next) =>{
        const check = await UserModel.getUserByEmail(req.body.email)
        if(check.code){
            res.json({status: 500, msg: "Email verification server error", err: check})
        }else{
            if(check.length > 0){
                if(check[0].email === req.body.email){
                    res.json({status: 401, msg: "Existing email"})
                }else{
                    res.json({status: 401, msg: "Please try with another email"})
                }
            }else{
                const user = await UserModel.saveOneUser(req)
                if(user.code){
                    res.json({status: 500, msg: "Register failed due to a server error", err: user})
                } else {
                    //TODO Send mail to verify account
                    res.json({status: 200, msg: "User registered"})
                }
            }
        }
    })

    app.post("/api/user/login", async (req, res, next) =>{
        const check = await UserModel.getUserByEmail(req.body.email)
        if(check.code){
            res.json({status: 500, msg: "Email verification server error", err: check})
        }else{
            if(check.length === 0){
                res.json({status: 404, msg: "Email or password invalid"})
            }else{
                const same = await bcrypt.compare(req.body.password, check[0].password)
                if(same){
                    const payload = {id: check[0].id, email: check[0].email}
                    const token = jwt.sign(payload, secret)
                    const userInfo = {
                        id: check[0].id,
                        username: check[0].username,
                        firstname: check[0].firstname,
                        lastname: check[0].lastname,
                        email: check[0].email,
                        phone: check[0].phone,
                        role: check[0].role,
                        avatar_url: check[0].avatar_url,
                        key_id: check[0].key_id
                    }
                    res.json({status: 200, msg: "Connection successful", token: token, user: userInfo})
                }else{
                    res.json({status: 401, msg: "Email or password invalid"})
                }
            }
        }
    })

    app.put("/api/user/update/:key_id", authentication, async(req, res, next)=>{
        const updateUser = await UserModel.updateUser(req, req.params.key_id)
        //TODO test if a company is set and add it to db
        if(updateUser.code){
            res.json({status: 500, msg: "Update user failed due to server errror", err: updateUser})
        }else{
            const newUser = await UserModel.getUserById(req.params.key_id)
            if(newUser.code){
                res.json({status: 500, msg: "Update user failed due to server errror", err: newUser})
            }else{
                const userInfo = {
                    id: newUser[0].id,
                    username: newUser[0].username,
                    firstname: newUser[0].firstname,
                    lastname: newUser[0].lastname,
                    email: newUser[0].email,
                    role: newUser[0].role, // TODO Garder l'ancien role et ne pas le modifié par cette route
                    avatar_url: newUser[0].avatar_url, //TODO Gerer l'import d'image depuis le front et dans UserModel
                    key_id: newUser[0].key_id
                }
                res.json({status: 200, msg: "User updated", user: userInfo})
            }
        }
    })

    app.put('/api/user/updatePict/:key_id', authentication, async (req, res, next) => {
        const changePict = await userModel.updateUserPict(req.body.avatar_url, req.params.key_id)
        if(changePict.code){
            res.json({status: 500, msg: "Update user avatar failed due to server errror", err: changePict})    
        }else{
            let user = await userModel.getUserById(req.params.key_id)
            if(user.code){
                res.json({status: 500, err: user})
            } else {
                let myUser = {
                        id: user[0].id,
                        email: user[0].email,
                        username: newUser[0].username,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        role: user[0].role,
                        avatar_url: user[0].avatar_url,
                        key_id: user[0].key_id
                    }
                res.json({status: 200, msg: "avatar modified with succes", user: myUser})
            }
        }
    })

    app.put("/api/user/updateRole/:key_id", authentication, async(req, res, next)=>{
        //TODO
    })
}