const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
if(!process.env.HOST_DB) {
	config = require('../config_offline');
} else {
	config = require('../config_online');
}
const secret = process.env.SECRET_USER || config.token.secret_user;

module.exports = (_db) => {
    db = _db
    UserModel = require('../models/UserModel')(db);
    CompanyModel = require('../models/CompanyModel')(db)
    return UserController
}

class UserController {
    static async register(req, res){
        const check = await UserModel.getUserByEmail(req.body.email)
        if(check.code){
            res.status(500).json({msg: "Email verification server error", error: check})
        }else{
            if(check.length > 0){
                if(check[0].email === req.body.email){
                    res.status(401).json({msg: "Existing email"})
                }else{
                    res.status(401).json({msg: "Please try with another email"})
                }
            }else{
                const user = await UserModel.saveOneUser(req)
                if(user.code){
                    res.status(500).json({msg: "Register failed due to a server error", error: user})
                } else {
                    //TODO Send mail to verify account
                    res.status(200).json({msg: "User registered"})
                }
            }
        }
    }

    static async login(req, res){
        const check = await UserModel.getUserByEmail(req.body.email)
        if(check.code){
            res.status(500).json({msg: "Email verification server error", error: check})
        }else{
            if(check.length === 0){
                res.status(404).json({msg: "Email or password invalid"})
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
                    res.status(200).json({msg: "Connection successful", token: token, user: userInfo})
                }else{
                    res.status(401).json({msg: "Email or password invalid"})
                }
            }
        }
    }

    static async checkToken(req, res){
        const user = await UserModel.getUserByEmail(req.email)
        if(user.code){
            res.status(500).json({msg: "User check error", err : user})
        }else{
            const myUser = {
                id: user[0].id,
                username: user[0].username,
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                email: user[0].email,
                phone: user[0].phone,
                role: user[0].role,
                avatar_url: user[0].avatar_url,
                key_id: user[0].key_id
            }
            res.status(200).json({msg: "User find", user: myUser})
        }
    }

    static async updateUser(req, res){
        const updateUser = await UserModel.updateUser(req, req.params.key_id)
        if(updateUser.code){
            res.status(500).json({msg: "Update user failed due to server error", error: updateUser})
        }else{
            const newUser = await UserModel.getUserById(req.params.key_id)
            if(newUser.code){
                res.status(500).json({msg: "Update user failed due to server error", error: newUser})
            }else{
                if(req.body.company_name){
                    const company = await CompanyModel.saveOneCompany(req, newUser[0].id);
                    if(company.code){
                        res.status(500).json({msg:"Failed to save company due to a server error", error: company})
                    }else{
                        res.status(200).json({msg: "Company saved"})
                    }
                }
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
                res.status(200).json({msg: "User updated", user: userInfo})
            }
        }
    }

    //TODO send to cloudinary or do it in front
    static async updateUserPict(req, res){
        const changePict = await UserModel.updateUserPict(req.body.avatar_url, req.params.key_id)
        if(changePict.code){
            res.status(500).json({msg: "Update user avatar failed due to server error", error: changePict})    
        }else{
            let user = await UserModel.getUserById(req.params.key_id)
            if(user.code){
                res.status(500).json({msg: "Get user failed due to server errror", error: user})
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
                res.status(200).json({msg: "avatar modified with succes", user: myUser})
            }
        }
    }

    static async updateUserRole(req, res){
        const updateUser = await UserModel.updateUserRole(req, req.params.key_id)
        if(updateUser.code){
            res.status(500).json({msg: "Update user failed due to server error", error: updateUser})
        }else{
            let user = await UserModel.getUserById(req.params.key_id)
            if(user.code){
                res.status(500).json({msg: "Get user failed due to server errror", error: user})
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
                    res.status(200).json({msg: "user role modified with succes", user: myUser})
            }
        }
    }

    static async getUser(req, res){
        const user = await UserModel.getUserById(req.params.key_id)
        if(user.code){
            res.status(500).json({msg: "Get user failed due to server error", error: user})
        }else{
            let myUser = {
                id: user[0].id,
                email: user[0].email,
                username: user[0].username,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                role: user[0].role,
                avatar_url: user[0].avatar_url,
                key_id: user[0].key_id
            }
            res.status(200).json({msg: "user found", user: myUser})
        }
    }

    static async getUsers(req, res){
        const users = await UserModel.getAllUsers();
        if(users.code){
            res.status(500).json({msg: "Get user failed due to server error", error: users})
        }else{
            if(users.length === 0){
                res.status(400).json({msg : "No users found"})
            }else{
                res.status(200).json({msg: "users found", user: users})
            }  
        }
    }

    static async saveOneCompany(req, res){
        const company = await CompanyModel.saveOneCompany(req, req.body.user_id);
        if(company.code){
            res.status(500).json({msg:"Failed to save company due to a server error", error: company})
        }else{
            res.status(200).json({msg: "Company saved"})
        }
    }

    static async getCompanies(req, res){
        const companies = await CompanyModel.getAllCompanies();
        if(companies.code){
            res.status(500).json({msg:"Failed to get companies due to a server error", error: companies})
        }else{
            if(companies.length === 0){
                res.status(400).json({msg : "No companies found"})
            }else{
                res.status(200).json({msg: "Companies founds", result: companies})
            }
        }
    }

    static async getUserCompany(req, res){
        const company = await CompanyModel.getUserCompany(req.params.user_id);
        if(company.code){
            res.status(500).json({msg:"Failed to get company due to a server error", error: company})
        }else{
            res.status(200).json({msg: "Company found", result: company})
        }
    }

    static async getCompany(req, res){
        const company = await CompanyModel.getOneCompany(req.params.id);
        if(company.code){
            res.status(500).json({msg:"Failed to get company due to a server error", error: company})
        }else{
            res.status(200).json({msg: "Company found", result: company})
        }
    }

    static async updateCompany(req, res){
        const updateCompany = await CompanyModel.updateCompany(req, req.params.id);
        if(updateCompany.code){
            res.status(500).json({msg:"Failed to update company due to a server error", error: updateCompany})
        }else{
            res.status(200).json({msg: "Company updated", result: updateCompany})
        }
    }

    static async deleteCompany(req, res){
        const deleteCompany = await CompanyModel.deleteCompany(req.params.id);
        if(deleteCompany.code){
            res.status(500).json({msg:"Failed to delete company due to a server error", error: deleteCompany})
        }else{
            res.status(200).json({msg: "Company deleted", result: deleteCompany})
        }
    }
}