var cookie = require("cookie");

export default async function handler(req,res){
    if(req.method != 'GET'){
        return res.status(405).json({message: 'Method is not allowed'})
    }
    try {
            res.setHeader(
                "Set-Cookie",
                cookie.stringifySetCookie({
                    name: "token",
                    value: '',
                    httpOnly: true,
                    path:'/',
                    maxAge:0, 
            }),
        );
        return res.status(200).json({message: 'User logged out successfully.'})
        
    } catch (error) {
        return res.status(500).json({message: 'Server error'})
    }
        
}