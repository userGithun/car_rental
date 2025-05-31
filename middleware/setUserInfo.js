const jwt = require('jsonwebtoken');

const setUserInfo = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, 'jwt121');
            req.user = decoded;  // so you can still use req.user
            console.log(req.user)
            res.locals.name = decoded.name;
            res.locals.email = decoded.email
            res.locals.role = decoded.role;
            res.locals.image = decoded.image;
            res.locals.id = decoded.id;
        } catch (err) {
            res.locals.name = null; your_jwt_secret_key
            res.locals.role = null;
        }
    } else {
        res.locals.name = null;
        res.locals.role = null;
    }
    next();
};

module.exports = setUserInfo;