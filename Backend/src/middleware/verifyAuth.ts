import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Auth from "../model/AuthModel";


class VerifyAuth {

    model = new Auth();

    async verifyToken(req:Request , res:Response , next:NextFunction) {
        try {
            const authHeaders = req.headers['authorization'];
            console.log(authHeaders);
            const token = authHeaders && authHeaders.split(' ')[1];
            if(token == null) return res.status(401);
            jwt.verify(token , process.env.ACCESTOKEN as string, (err , decoded) =>{
                if(err) return res.status(401).json("Token Expaied");
                req.body.email = decoded;
                next();
            });
        } catch (error) {
            console.log(error);
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async refreshToken(req:Request , res:Response , next:NextFunction){
        try {
            const refreshtoken = req.cookies.refreshToken;

            if(!refreshtoken) return res.status(401);

            const user = await this.model.logout(refreshtoken);
            if(!user[0]) return res.status(401);

            jwt.verify(refreshtoken , process.env.REFRESHTOKEN as string , (err:any, decoded:any) => {
                if(err) return res.status(401);
                const id = user[0].id_user;
                const eml = user[0].email; 
                const role = user[0].role; 
            
                const accesToken =  jwt.sign({id, eml , role} , "U3C32RKIM9C329C9MERIJDF9UCM4M9UTSCIW092UU4DNFDN9JDJDJF" ,{
                    expiresIn: "20s"
                })

                res.status(200).json({payload: accesToken});
            
            })
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
}

export default VerifyAuth;