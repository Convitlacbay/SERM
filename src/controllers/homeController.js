import db from "../models/index"
import crudServices from "../services/crudServices"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log(`--------------`)
        console.log(data)
        console.log(`--------------`)
        return res.render(`homePage.ejs`, {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log('Unable to connect homePage', error);
    }


}

let getCrud = async (req, res) => {
    try {
        await res.render(`create-crud.ejs`)
        // console.log(`--------------`) check data
        // console.log(data)
        // console.log(`--------------`)
        // return res.render(`homePage.ejs`, {
        //     data: JSON.stringify(data)
    } catch (error) {
        console.log('Unable to connect crud', error);
    }
}

let createCrud = async (req, res) => {
    let mes = await crudServices.createNewUser(req.body)
    console.log(mes)
    return res.send(`helo createCrud`)
}

let readCrud = async (req, res) => {
    let data = await crudServices.getAllUsers()
    console.log(`-------------`)
    console.log(data)
    console.log(`-------------`)
    return res.render(`read-crud.ejs`, {
        dataTable: data
    })
}

let updateCrud = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await crudServices.getUserById(userId)
        console.log(`-------------`)
        console.log(userData)
        console.log(`-------------`)
        return res.render(`update-crud.ejs`, {
            userData: userData //gan gia tri userData phai cho userData trai cho view
        })
    }
    else {

    }
}

let putCrud = async (req, res) => {
    let data = req.body
    let allUsers = await crudServices.updateUserData(data)
    return res.render(`read-crud.ejs`, {
        dataTable: allUsers
    })
}


module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    createCrud: createCrud,
    readCrud: readCrud,
    updateCrud: updateCrud,
    putCrud: putCrud,
}