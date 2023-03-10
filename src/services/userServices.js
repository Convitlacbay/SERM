import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err);
        }
    })
}

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

let createNewUsers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is existing
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: `your email is already used`
                })
            } else {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    Message: `OK`
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

let deleteUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user is not exist `
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            Message: `The user is deleted successfully`
        })
    })
}

let editUsers = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameter`
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                await user.save()
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // }, { where: { id: userId } })
                resolve({
                    errCode: 0,
                    Message: `Edit user successfully`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User not found`
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUsers: createNewUsers,
    deleteUsers: deleteUsers,
    editUsers: editUsers,
}