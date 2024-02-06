const authentication = require("../middleware/authentication")

module.exports = (app, db) =>{
    const UserController = require("../controllers/UserController")(db)

    app.get("/api/checkUserToken", authentication, UserController.checkToken);
}