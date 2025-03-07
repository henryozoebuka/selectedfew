import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: 'Please login to continue.'});
    }

    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: 'Invalid or expired token.'});
        }
        req.user = decoded;
        next();
    })
}

export default authenticateToken;