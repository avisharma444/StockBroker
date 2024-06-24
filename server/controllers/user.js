import jwt from 'jsonwebtoken';
import { getuserinfo } from '../database.js';

export const get_user_info = async (req, res) => {
    const { token } = req.body; // Extract token from request body
    console.log("Received token:", token);
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        const user_id = decoded.id; // Extract user ID from the token
        console.log("user id - ",user_id)
        try {
            const info = await getuserinfo(user_id); // Ensure this is an async function
            return res.status(200).json(info);
        } catch (error) {
            console.error('Error fetching user info:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};
