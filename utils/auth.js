import { verify } from "jsonwebtoken"

export default function validateToken(context){
    // Get Token from Cookies
    const {token} = context.req.cookies
    // Check Token exist
    if(!token){ return false}
    // Verify Token
    try {
        const tokenPayload = verify(token,process.env.JWT_SECRET)
        return tokenPayload
    } catch (error) {
        return false
    }

}