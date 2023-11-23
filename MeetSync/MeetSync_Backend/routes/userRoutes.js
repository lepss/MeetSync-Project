const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = 'fsjs30' //TODO stocké dans env
const withAuth = require("../middleware/withAuth")

module.exports = (app, db) =>{
    const UserModel = require("../models/UserModel")(db)

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
                    res.json({status: 500, msg: "Register failed due to server error", err: user})
                } else {
                    res.json({status: 200, msg: "User registered"})
                }
            }
        }

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
                        const payload = {id: check[0].id}
                        const token = jwt.sign(payload, secret)
                        const userInfo = {
                            id: check[0].id,
                            username: check[0].username,
                            firstname: check[0].firstname,
                            lastname: check[0].lastname,
                            email: check[0].email,
                            phone: check[0].phone,
                            role: check[0].role
                        }
                        res.json({status: 200, msg: "Connection successful", token: token, user: userInfo})
                    }else{
                        res.json({status: 401, msg: "Email or password invalid"})
                    }
                }
            }
        })

        app.put("/api/user/update/:id", withAuth, async(req, res, next)=>{
            const updateUser = await UserModel.updateUser(req, req.params.id)
            if(updateUser.code){
                res.json({status: 500, msg: "Update user failed due to server errror", err: updateUser})
            }else{
                const newUser = await UserModel.getUserById(req.params.id)
                if(newUser.code){
                    res.json({status: 500, msg: "Update user failed due to server errror", err: newUser})
                }else{
                    const userInfo = {
                        id: newUser[0].id,
                        username: newUser[0].username,
                        firstname: newUser[0].firstname,
                        lastname: newUser[0].lastname,
                        email: newUser[0].email,
                        phone: newUser[0].phone,
                        role: newUser[0].role,
                        avatar_url: newUser[0].avatar_url //TODO Gerer l'import d'image depuis le front et dans UserModel
                    }
                    res.json({status: 200, msg: "User updated", user: userInfo})
                }
            }
        })
    })
}