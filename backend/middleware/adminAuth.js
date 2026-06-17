import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const {token} = req.headers

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: 'Unauthorized User' });
        }

        next();

    } catch (error) {
        res.status(401).json({success: false, message: 'Authentication failed' });
    }
};

export default adminAuth;