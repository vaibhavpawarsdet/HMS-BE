import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        };

        const decoded = await validateToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid token" });
    };
}
const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "secretKey", (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};