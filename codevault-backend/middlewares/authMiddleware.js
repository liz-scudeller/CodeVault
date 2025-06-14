require('dotenv').config();
const JWT = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized - No token provided'});
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        
        req.user = {id: decoded.id};
        next();
        
    } catch (error) {
          console.error('JWT Verify Error:', error);
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

module.exports = authMiddleware;