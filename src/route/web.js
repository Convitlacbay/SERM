import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCrud)
    router.post('/post-crud', homeController.postCrud)
    router.get('/read-crud', homeController.readCrud)

    return app.use("/", router)

    //res api
}

module.exports = initWebRoutes