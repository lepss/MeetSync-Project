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
    /**
     * Save one user with minimum parameters
     * @param {request} req 
     * @returns {(response|error)} Response of db query or error 
     */
    static saveOneUser(req){
        let key_id  = randomId(len, pattern)
        return bcrypt.hash(req.body.password, saltRounds)
        .then((hash)=>{
            return db.query(`
            INSERT INTO users
            (email, password, role, key_id, created_at, account_validate, avatar_url)
            VALUES (?, ?, "user", ?, NOW(), ?, "no-pict.jpg")`, 
            [req.body.email, hash, key_id, false])
            .then((res)=>{
                res.key_id = key_id;
                return res;
            })
            .catch((err)=>{
                console.log(err);
                return err;
            })
        })
        .catch(err=>console.log(err))    
    }

    /**
     * Validate user account 
     * @param {string} key_id - Unique user id
     * @returns {(response|error)} Response or error of db query
     */
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
            console.log(err);
            return err
        })
	}

    /**
     *  Update user key id
     * @param {string} email 
     * @returns {(response|error)} Response or error of db query
     */
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

    /**
     * Update new user password
     * @param {string} newPassword 
     * @param {string} key_id 
     * @returns {(response|error)} Response or error of db query
     */
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

    /**
     * Get one user by his email
     * @param {string} email 
     * @returns {(response|error)} Response or error of db query
     */
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

    /**
     * Get user by his key id
     * @param {string} key_id 
     * @returns {(response|error)} Response or error of db query
     */
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