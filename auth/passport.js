const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Register");
const bcrypt = require("bcrypt");

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.user_id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            where: {
                user_id: id
            }
        }).then((user) => {
            return done(null, user);
        });
    });

    passport.use(
        "local-signup",
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            function (req, email, password, done) {
                User.findAll({
                        where: {
                            email: email
                        }
                    })
                    .then((result) => {
                        if (result.length > 0) {
                            return done(
                                null,
                                false,
                                req.flash("error_msg", "This email is already taken")
                            );
                        } else {
                            bcrypt.hash(req.body.password, 10, (error, hash) => {
                                var fullname = req.body.fullname;
                                var email = req.body.email;
                                var password = hash;
                                var data = {
                                    fullname,
                                    email,
                                    password
                                };
                                User.create({
                                        fullname: fullname,
                                        email: email,
                                        password: password,
                                    })
                                    .then((rows) => {
                                        return done(
                                            null,
                                            data,
                                            req.flash("success_msg", "successfully registered")
                                        );
                                    })
                                    .catch((error) => {
                                        return done(error);
                                    });
                            });
                        }
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }
        )
    );

    passport.use(
        "local-signin",
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            function (req, email, password, done) {
                User.findAll({
                        where: {
                            email: email
                        }
                    })
                    .then((rows) => {
                        if (!rows.length) {
                            return done(
                                null,
                                false,
                                req.flash("error_msg", "Username or password is incorrect !")
                            );
                        } else {
                            bcrypt.compare(password, rows[0].password, (error, result) => {
                                if (result) {
                                    // console.log(rows[0]);
                                    req.session.user_id = rows[0].user_id;
                                    req.session.username = rows[0].fullname;
                                    return done(
                                        null,
                                        rows[0],
                                        req.flash("success_msg", "You are logged in!!!")
                                    );
                                } else {
                                    return done(
                                        null,
                                        false,
                                        req.flash("error_msg", "Username or password is incorrect")
                                    );
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        return done(error);
                    });
            }
        )
    );
};