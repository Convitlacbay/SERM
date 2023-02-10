import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";


let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCrud)
    router.post('/create-crud', homeController.createCrud)
    router.get('/read-crud', homeController.readCrud)
    router.get('/update-crud', homeController.updateCrud)
    router.post('/put-crud', homeController.putCrud)
    router.get('/delete-crud', homeController.deleteCrud)

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.post('/api/create-new-users', userController.handleCreateNewUsers)
    router.put('/api/edit-users', userController.handleEditUsers)
    router.delete('/api/delete-users', userController.handleDeleteUsers)// APIS




    return app.use("/", router)

    //res api
}

module.exports = initWebRoutes