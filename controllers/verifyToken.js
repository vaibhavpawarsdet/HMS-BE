import jwt from "jsonwebtoken";

 const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        };

        const decoded =  jwt.verify(token, "secretKey");
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid token" });
    };
}
export default verifyToken;