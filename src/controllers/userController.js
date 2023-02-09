import userServices from '../services/userServices'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            Message: `Missing parameters`
        })
    }

    let userData = await userServices.handleUserLogin(email, password)

    return res.status(200).json({
        // errCode: 0,
        // Message: 'helo handleLogin',
        // yourEmail: email,
        // test: 'your'
        errCode: userData.errCode,
        Message: userData.errMessage,
        userData: userData.user ? userData.user : {}
    })
}

// check email exist
// compare password
// return user info
// access token
// if (email === '' || email === null || email === 'undefined') 

let handleGetAllUser = async (req, res) => {
    let id = req.query.id //all, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: `Missing required parameter`,
            users: []
        })
    }

    let users = await userServices.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: `OK`,
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}