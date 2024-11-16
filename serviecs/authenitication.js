const JWT=require("jsonwebtoken")

const secret="Deepak1234@2345"

function createTokenForUser(user){
    const paylaod={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageUrl,
        role:user.role
    };
    const token=JWT.sign(paylaod,secret)
    console.log(token);
    return token
    

}

function validateToken(token){
    const payload=JWT.verify(token,secret)
    return payload
}
module.exports={
    createTokenForUser,
    validateToken
}

