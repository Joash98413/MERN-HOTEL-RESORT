import jwt from 'jsonwebtoken';

export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log('Admin login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default adminLogin;