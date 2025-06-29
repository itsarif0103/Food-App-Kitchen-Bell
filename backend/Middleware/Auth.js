import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Not autorized Login Again!"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRE);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}