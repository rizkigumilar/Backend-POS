const userModels = require('../models/user')
const resultRespon = require('../helpers/helper')

const jwt = require('jsonwebtoken')

module.exports = {

    register: (req, res) => {
        const salt = resultRespon.generateSalt(18)
        const passwordHash = resultRespon.setPassword(req.body.password, salt)

        const data = {
            email: req.body.email,
            username: req.body.username,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
        }
        console.log(data)

        userModels.register(data)
            .then((resultRegister) => {
                resultRespon.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
                return resultRespon.response(res, null, 403, 'Email is already taken !!!')
            })
    },

    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        userModels.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = resultRespon.setPassword(password, dataUser.salt).passwordHash

                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        userid: dataUser.userid
                    }, process.env.SECRET_KEY || 'sTraiwaYstOheav3n', { expiresIn: '12h' })

                    delete dataUser.salt
                    delete dataUser.password

                    return resultRespon.response(res, dataUser, 200)
                } else {
                    return resultRespon.response(res, null, 403, 'Wrong password!')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}