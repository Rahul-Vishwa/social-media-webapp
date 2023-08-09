const jwt=require('jsonwebtoken')

const SecretKey='S3cr3t'

const jwtGenerate=(username)=>{
    return jwt.sign({username, role:'user'}, SecretKey, {expiresIn:'1h'})
}

const jwtAuthenticate=(req, res, next)=>{
    const authHeader=req.headers.authorization
    if (authHeader){
        const token=authHeader.split(' ')[1]
        jwt.verify(token, SecretKey, (err, user)=>{
            if (err){
                return res.sendStatus(403)
            }
            req.user=user
            next()
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports={jwtGenerate, jwtAuthenticate}