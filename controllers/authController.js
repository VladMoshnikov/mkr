const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Реєстрація', user: req.session.user });
};

exports.register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };

    User.create(newUser, (err) => {
        if (err) throw err;
        res.redirect('/auth/login');
    });
};

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Вхід', user: req.session.user });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err) throw err;
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/exercises');
        } else {
            res.redirect('/auth/login');
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
