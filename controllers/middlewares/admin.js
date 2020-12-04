var isAdminLoggedIn = (req, res, next) => {
    if (req.user) {
        if (!req.user.role == 0) {
            res.send("You are not authorized!!!");
        } else {
            next();
        }
    } else {
        res.redirect("/login");
    }
};

module.exports = isAdminLoggedIn;