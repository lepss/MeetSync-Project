const authentication = require("../middleware/authentication")

module.exports = (app, db) =>{
    const UserController = require("../controllers/UserController")(db)

    app.post("/api/user/register", UserController.register);
    app.post("/api/user/login", UserController.login);
    app.put("/api/user/update/:key_id", authentication, UserController.updateUser);
    app.put('/api/user/updatePict/:key_id', authentication, UserController.updateUserPict);
    app.put("/api/user/updateRole/:key_id", authentication, UserController.updateUserRole);
    app.get("/api/user/:key_id", authentication, UserController.getUser);
    app.get("/api/users", authentication, UserController.getUsers)
    app.get("/api/users/count", UserController.getUsersCount)
}