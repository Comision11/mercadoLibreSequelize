const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

module.exports = {
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        let { nombre, email, pass } = req.body;
        if (errors.isEmpty()) {

            db.User.create({
                name: nombre.trim(),
                email: email.trim(),
                password: bcrypt.hashSync(pass, 10),
                avatar: 'default.png',
                rolId: 1
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    rol: user.rol,
                    avatar: user.avatar
                }
                return res.redirect('/')
            }).catch(error => console.log(error))
        } else {
            return res.render('register', {
                old: req.body,
                errors: errors.mapped()
            })
        }
    },
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        const { email } = req.body;
        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email
                }
            }).then(user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    rol: user.rolId,
                    avatar: user.avatar
                }

                return res.redirect('/')


            })
                .catch(error => console.log(error))

        } else {
            return res.render('login', {
                errors: errors.mapped()
            })
        }
    },
    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                return res.render('profile', {
                    user
                })
            })
    },
    update: (req, res) => {
        const { name, password } = req.body;
        db.User.update(
            {
                name: name.trim(),
                avatar: req.file && req.file.filename,
            },
            {
                where: {
                    id: req.session.userLogin.id
                }
            }).then(() => {

                if (password) {
                    console.log("password ------->>>>>", password)
                    db.User.update(
                        {
                            password: bcrypt.hashSync(password.trim(), 10)
                        },
                        {
                            where: {
                                id: req.session.userLogin.id
                            }
                        }
                    )
                        .then(() => {

                            req.session.destroy();
                            return res.redirect('/users/login')
                        })
                } else {

                    db.User.findByPk(req.session.userLogin.id)
                        .then(user => {
                            req.session.userLogin = {
                                id: user.id,
                                name: user.name,
                                rol: user.rolId,
                                avatar: user.avatar
                            }
                            res.locals.userLogin = req.session.userLogin

                            return res.redirect('/users/profile')

                        })
                }


            }).catch(error => console.log(error))
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}