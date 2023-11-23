const bcrypt = require("bcrypt")
const saltRounds = 10

module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel{
    static saveOneUser(req){
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=>{
            return db.query(`
            INSERT INTO users
            (email, password, role)
            VALUES (?, ?)
            `, [req.body.email, hash, "user"])
            .then((res)=>{
                return res;
            })
            .catch((err)=>{
                return err;
            })
        })
        .catch(err => console.log(err))
    }

    static getUserByEmail(email){
        return db.query(`
        SELECT *
        FROM users
        WHERE email = ?
        `, [email])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static getUserById(userId){
        return db.query(`
        SELECT *
        FROM users
        WHERE id = ?
        `, [userId])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static updateUser(req, userId){
        return db.query(`
        UPDATE users
        SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, avatar_url = ?
        WHERE id = ?
        `, [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.avatar_url, userId])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static updateUserRole(req, userId){
        return db.query(`
        UPDATE users
        SET role = ?
        WHERE id = ?
        `, [req.body.role, userId])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
}