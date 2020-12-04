const express = require('express');
const app = express();
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//setting up ejs templating engine
const ejs = require('ejs');
const layout = require('express-ejs-layouts');
app.use(layout);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//setting up templating engine
// const exphbs = require("express-handlebars");
// const hbs = exphbs.create({
//     defaultLayout: "mainLayout",
//     extname: ".hbs",
//     partialsDir: __dirname + "views/partials",
// });
// app.set("view engine", "hbs");
// app.engine("hbs", hbs.engine);

//setting up public directory
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public2")));


//setting up BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

//database
const db = require('./database/connection')

//setting up session store
var myStore = new SequelizeStore({
    db: db,
    tableName: "sessions",
    checkExpirationInterval: 15 * 60 * 60 * 1000,
    expiration: 12 * 60 * 60 * 1000,
});

//setup session and flash
app.use(
    session({
        key: "session_cookie_name",
        secret: "thisissecret",
        store: myStore,
        saveUninitialized: true,
        resave: true,
        rolling: true,
        maxAge: 600000000000,
        cookie: {
            maxAge: 60000000000
        },
    })
);
app.use(flash());

// const passportInit=require('./auth/passport');
let passportConfig = require("./auth/passport");
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    res.locals.username = req.session.username
    res.locals.ordercount = 0;
    next();
});

//importing routes here
const webRoutes = require('./routes/web');
const authRoutes = require('./routes/authRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
app.use(webRoutes)
app.use(authRoutes)
app.use(dashboardRoutes)


module.exports = app;