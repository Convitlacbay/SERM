import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)

    router.get('/', (req, res) => {
        return res.send(`hello world`)
    })
    return app.use("/", router)

    //res api
}

module.exports = initWebRoutes