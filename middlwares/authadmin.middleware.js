const jwt = require('jsonwebtoken');

exports.authadmin=(req,res,next)=>{
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
        
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        return next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};