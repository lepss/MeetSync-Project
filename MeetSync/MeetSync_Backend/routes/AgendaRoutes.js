const authentication = require("../middleware/authentication")

module.exports = (app, db) => {
    const AgendaController = require("../controllers/AgendaController")(db)

	app.get("/api/agenda/generate/:event_id", authentication, AgendaController.generateEventAgenda);
}