import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET)
            req.user = user
            next();

        } else {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
    } catch (error) {
   return res.status(500).json({ message: error.message });
    }
}