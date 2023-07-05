import jwt from "jsonwebtoken";

const checkAuth = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: "Unauthorized Access" });
            };

            const decoded = jwt.verify(token, "secretKey");
            const userRole = decoded.role;
            if (role.includes(userRole)) {
                req.user = decoded;
                next();
            } else {
                res.status(403).json({ message: "Forbidden" });
            }
        } catch (error) {
            console.error(error);
            return res.status(403).json({ message: "Invalid token" });
        };
    }
};
export default checkAuth;