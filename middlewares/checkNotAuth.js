module.exports = function checkNotAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    }
    return res.redirect('/dashboard')
}

