
const jwt = require ("jsonwebtoken")
const {verify} = require ("jsonwebtoken")
require('dotenv').config();
const auth = async ( request, response, next)=>{
    const authHeader = request.headers.authorization;
    const jwtKey= process.env.JWT_SECRET;


    if (!authHeader) {
        return response.status(401).json({ error: "User not authorizated!" });
      }

      const [, token] = authHeader.split(" ");
  
      try{
        const decoded = verify(token,jwtKey)
        console.log ( decoded);
        return next();
      } catch (err){
        return response.status(401).json({error: " Invalide Jwt Token"});

      }


}

module.exports = auth;
