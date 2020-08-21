import jwt from 'jsonwebtoken'

export const checkAuth= (req,res, next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1]
        console.log(token)
        const verifiedToken= jwt.verify(token, process.env.JWT_KEY)
        req.userData= verifiedToken
        next()
    }catch(err){
        //console.log(err)
        res.status(500).json({
            message: "Auth failed"
        })
    }
}