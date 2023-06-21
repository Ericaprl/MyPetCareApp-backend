
const jwt = require ("jsonwebtoken")
const {verify} = require ("jsonwebtoken")

const auth = async ( request, response, next)=>{
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: "User not authorizated!" });
      }

      const [, token] = authHeader.split(" ");
  
      try{
        const decoded = verify(token,"d5c7506650943503c93fced3763c935b")
        console.log ( decoded);
        return next();
      } catch (err){
        return response.status(401).json({error: " Invalide Jwt Token"});

      }


}

module.exports = auth;
