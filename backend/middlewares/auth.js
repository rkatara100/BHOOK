import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
      const { token } = req.headers;

      console.log("middleware",token)

      if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
      }
      try {
            console.log("token hai mere pas")
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = token_decode.id;
            next();
      }
      catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" });
      }

}

export default authMiddleware;