module.exports = (_db) => {
    db = _db
    CompanyModel = require('../models/CompanyModel')(db);
    return CompanyController
}

class CompanyController{
    
}