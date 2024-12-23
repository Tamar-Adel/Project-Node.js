const jwt = require('jsonwebtoken');

exports.authuser=(req,res,next)=>{
      const{authorization}=req.headers;
        if (!authorization) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const token=authorization.split(' ')[1];// שהוספנו לפני הטוקן Bearer מחיקת המילה
    
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }
    
        const secretKey = env.JWT_SECRET;
    
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user_id = user.id;
            req.user_role = user.role;
            return next();
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    };
    //לפני הפונקציה ב--rout לשלוח מידלוואר
    // לבדוק במידלוואר נוסף אחרי במידוואר שלהלן האם הוא מנהל

