import express from "express";
import homeController from "../controllers/homeController";


let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCrud)
    router.post('/create-crud', homeController.createCrud)
    router.get('/read-crud', homeController.readCrud)
    router.get('/update-crud', homeController.updateCrud)
    router.post('/put-crud', homeController.putCrud)
    router.get('/delete-crud', homeController.deleteCrud)


    return app.use("/", router)

    //res api
}

module.exports = initWebRoutes