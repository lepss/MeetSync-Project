if(!process.env.HOST_DB) {
	config = require('../config_offline');
} else {
	config = require('../config_online');
}

const authorizatrion = (req, res, next) =>{
    const contentId = req.params.contentId
    const contentType = req.params.contentType

    //Find content by id and content type
    //If req. id = content.user_id -> allow and go next 
    //Else block acces to route

}