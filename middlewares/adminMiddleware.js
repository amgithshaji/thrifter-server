const jwt = require('jsonwebtoken')

const adminMiddleware = (req, res, next) => {
    console.log("inside adminMiddleware ");
    // logic to verify token 
    // get token - req header
    const token = req.headers['authorization'].split(" ")[1]
    // console.log(token);
    if (token) {
        try {
            const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
            console.log(jwtResponse);
          // in this response we will the token owners email id and role ,whatever we added in the payload when we sign(created) the token will get here.
            req.payload = jwtResponse.userMail
            // console.log(req.payload);
             req.role = jwtResponse.role
        if(jwtResponse.role =="admin"){
        next()  
        }else{
            res.status(401).json("Authorization failed!!!  invalid token")
        }
        } catch(error) {
            res.status(401).json("Authorization failed!!!  invalid token")

        }


    } else {
        res.status(401).json("Authorization failed!!!  invalid token")

    }

}

module.exports = adminMiddleware