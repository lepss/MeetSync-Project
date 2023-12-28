module.exports = (_db) => {
    db = _db
    return CompanyModel
}

class CompanyModel{
    static saveOneCompany(req){
        return db.query(`
        INSERT INTO companies
        (name, country, city, website, user_id)
        VALUES (?, ?, ?, ?, ?)`
        , [req.body.name, req.body.country, req.body.city, req.body.website, req.body.user_id])
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    }

    static getAllCompanies(){
        return db.query (`
        SELECT *
        FROM companies
        `, [])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static getUserCompany(user_id){
        return db.query (`
        SELECT *
        FROM companies
        WHERE user_id = ?
        `, [user_id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        }) 
    }

    static getOneCompany(id){
        return db.query (`
        SELECT *
        FROM companies
        WHERE id = ?
        `, [id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        }) 
    }

    static updateCompany(req, id){
        return db.query (`
        UPDATE companies
        SET name = ?, country = ?, city = ?, website = ?
        WHERE id = ?
        `, [req.body.name, req.body.country, req.body.city, req.body.website, id])
        .then((res)=>{
            return res
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    }

    static deleteCompany(id){

    }
}