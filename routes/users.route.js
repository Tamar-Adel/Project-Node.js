const express = require('express');
const { getAllUsers, login, addUser } = require('../controllers/user.controller');

const myRouter = express.Router();

// all users - GET  (קבלת מידע)
myRouter.get('/', getAllUsers);

// login     - POST (get-יותר מאובטח מ)
myRouter.post('/login', login);

// register  - POST (הוספת לקוח חדש)
myRouter.post('/register', addUser);

module.exports = myRouter;