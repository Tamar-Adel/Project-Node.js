const bcrypt = require('bcryptjs');
const { User, generateToken } = require('../models/user.model');



module.exports = {


  getusers: async (req, res, next) => {
    try {
      const arrusers = await User.find()
      res.json(arrusers)
    }
    catch (error) {
      next({ error: error.message })
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const currentuser = await User.findOne({ email: email });
    if (!currentuser) {
      return next({ error: 'login failed', status: 401 })
    }

    //השוואת הסיסמא 

    const flag = await bcrypt.compare(password, currentuser.password);
    if (flag) {
      const token = generateToken(currentuser);
      currentuser.password = '****';
      return res.json(currentuser,token);
    }
    else {

      return next({ error: 'login failed', status: 401 })
    }
  },

  // register  - POST (הוספת לקוח חדש)
  register: async (req, res) => {
    try {
      const newUser = new User(req.body); 
      await newUser.save()
      const token = generateToken(newUser);
      res.json(" נרשמת בהצלחה ")
    }
    catch (error) {
      next({ error: error.message, status: 403 })

    }
  }
}



