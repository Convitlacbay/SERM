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
        await res.render(`crud.ejs`)
        // console.log(`--------------`)
        // console.log(data)
        // console.log(`--------------`)
        // return res.render(`homePage.ejs`, {
        //     data: JSON.stringify(data)
    } catch (error) {
        console.log('Unable to connect crud', error);
    }
}

let postCrud = async (req, res) => {
    let mes = await crudServices.createNewUser(req.body)
    console.log(mes)
    return res.send(`helo postCrud`)
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
}