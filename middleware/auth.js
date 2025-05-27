const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')

const checkAuth = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        // req.flash('error' ,'Unathorised user please Login')
        // res.redirect('/')
    } else {
        const verifyToken = jwt.verify(token, 'jwt121')
        // console.log("verifyToken:", verifyToken)
        const data = await UserModel.findOne({ _id: verifyToken.id })
        console.log("User data from DB:", data);
        req.udata = data

        next()
    }
}
module.exports = checkAuth