const express = require('express');
const{getusers,login,register}=require('../controllers/user.controller');
const { authadmin } = require('../middlwares/authadmin.middleware');

const myRouter = express.Router();



myRouter.get('/',authadmin,getusers);

// login     - POST (get-יותר מאובטח מ)
myRouter.post('/login',login);
// register  - POST (הוספת לקוח חדש)
myRouter.post('/',register);


module.exports = myRouter;