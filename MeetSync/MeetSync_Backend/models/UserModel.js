const bcrypt = require("bcrypt")
const saltRounds = 10
const randomId = require("random-id")
const len = 30
const pattern = "aA0"

module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel{

    static saveOneUser(req){
        let key_id  = randomId(len, pattern)
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=>{
            return db.query(`
            INSERT INTO users
            (email, password, role, key_id, created_at, account_validate, avatar_url)
            VALUES (?, ?, ?, ?, NOW(), ?, ?)`, 
            [req.body.email, hash, "user", randomId, false, "no-pict.jpg"])
            .then((res)=>{
                res.key_id = key_id;
                return res;
            })
            .catch((err)=>{
                return err;
            })
        })
        .catch(err=>console.log(err))    
    }

    static updateAccountValidateUser(key_id){
		return db.query(`
        UPDATE users 
        SET account_validate = ? 
        WHERE key_id = ?`, 
        [true, key_id])
        .then((res)=>{
            return res
        })
        .catch((err) => {
            return err
        })
	}

    static updateKeyId(email){
        let randomKey_id = randomId(len, pattern)
		return db.query(`
        UPDATE users 
        SET key_id = ? 
        WHERE email = ?`, 
        [randomKey_id, email])
        .then((res)=>{
            res.key_id = randomKey_id
            return res
        })
        .catch((err) => {
            return err
        })
	}

    static updatePassword(newPassword, key_id){
	    return bcrypt.hash(newPassword, saltRounds)
        .then((hash)=>{
            return db.query(`
            UPDATE users 
            SET password = ? 
            WHERE key_id = ?`, 
            [hash, key_id])
            .then((res)=>{
                return res
            })
            .catch((err) => {
                return err
            })
        })
        .catch(err=>console.log(err))
	    
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

    static getUserById(key_id){
        return db.query(`
        SELECT *
        FROM users
        WHERE key_id = ?
        `, [key_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static updateUserPict(img_url, key_id){
        return db.query(`
        UPDATE users
        SET avatar_url = ?
        WHERE key_id = ?
        `, [img_url, key_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static updateUser(req, key_id){
        return db.query(`
        UPDATE users
        SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, avatar_url = ?
        WHERE key_id = ?
        `, [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.avatar_url, key_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }

    static updateUserRole(req, key_id){
        return db.query(`
        UPDATE users
        SET role = ?
        WHERE key_id = ?
        `, [req.body.role, key_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            return err
        })
    }
}