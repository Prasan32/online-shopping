const passport = require('passport')
const bcrypt = require("bcrypt");
const User = require("../models/Register");

function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role == 0 ? "/dashboard" : "/";
    };
    return {
        login(req, res) {
            res.render('auth/login');
        },
        register(req, res) {
            res.render('auth/register')
        },
        postRegister(req, res, next) {
            console.log(req.body)
            passport.authenticate("local-signup", {
                failureRedirect: "/register",
                successRedirect: "/login",
                failureFlash: true,
                session: false,
            })(req, res, next);
        },
        postLogin(req, res, next) {
            passport.authenticate("local-signin", (err, user, info) => {
                if (err) {
                    req.flash("error_msg", "Something went wrong!!!");
                    return next(err);
                }
                if (!user) {
                    // req.flash("error_msg", "User Not found");
                    return res.redirect("/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash("error_msg", "Something went wrong!!!");
                        return next(err);
                    }
                    return res.redirect(_getRedirectUrl(req));
                });
            })(req, res, next);
        },
        logout(req, res) {
            req.session.destroy();
            req.logout();
            return res.redirect('/login')
        },
    }
}

module.exports = authController