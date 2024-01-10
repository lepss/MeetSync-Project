module.exports = (_db) => {
    db = _db
    CompanyModel = require('../models/CompanyModel')(db);
    return CompanyController
}

class CompanyController{
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

