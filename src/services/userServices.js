import db from "../models/index"
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exists

                let user = await db.User.findOne({
                    attributes: [
                        `email`, `roleId`, `password`
                    ],
                    where: {
                        email: email

                    },
                    raw: true
                })
                if (user) {
                    //compare password
                    // bcrypt.compareSync(`not`,hash) false
                    let check = await bcrypt.compareSync(password, user.password)

                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = `Ok`
                        console.log(user)
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User not found`
                }
            } else {
                //return err
                userData.errCode = 1
                userData.errMessage = `your Email not exists`
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    })
}

// let compareUserPassword = () => {
//     return new Promise(async (resolve, reject) => {
//         try {

//         } catch (err) {
//             reject(err);
//         }
//     })
// }

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ``
            if (userId === `ALL`) {
                users = await db.User.findAll({
                    attributes: {
                        exclude: [`password`]//khong gui password len cline
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: [`password`]//khong gui password len cline
                    }
                })
            }
            resolve(users)

        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
}