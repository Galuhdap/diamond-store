import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Auth from "../model/AuthModel";
import User from "../model/UserModel";
import Routers from "../controller/Router/Router";
import "dotenv/config";


class VerifyAuth extends Routers {

    model = new Auth();
    users =  new User();

    constructor(){
        super();
        this.router.get('/token', this.refreshToken.bind(this));
    }

    async verifyToken(req:Request , res:Response , next:NextFunction) {
        try {
            const authHeaders = req.headers['authorization'];
            const token = authHeaders && authHeaders.split(' ')[1];
            if(token == null) return res.status(401);
            jwt.verify(token , process.env.ACCESTOKEN as string, (err , decoded) =>{
                if(err) return res.status(401).json("Token Expaied");
                req.body.email = decoded;
                next();
            });
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async refreshToken(req:Request , res:Response , next:NextFunction){
        try {
            const refreshtoken = req.cookies.refreshToken;
            console.log(refreshtoken);
            if(!refreshtoken) return res.status(401);
            const user = await this.model.logout(refreshtoken);
            if(!user[0]) return res.status(401);

            jwt.verify(refreshtoken , process.env.REFRESHTOKEN as string , (err:any, decoded:any) => {
                if(err) return res.status(401);
                const id = user[0].id_user;
                const eml = user[0].email; 
                const role = user[0].role; 
            
                const accesToken =  jwt.sign({id, eml , role} , process.env.ACCESTOKEN as string ,{
                    expiresIn: "20s"
                })
                res.status(200).json({data: accesToken});
            
            })
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async verfiyRole(req:Request , res:Response, next:NextFunction){
        try {
            const authHeaders = req.headers['authorization'];
            const token = authHeaders && authHeaders.split(' ')[1];
            if(token == null) return res.status(401);
            const decoded = jwt.verify(token , process.env.ACCESTOKEN as string) as JwtPayload;
            if(decoded.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
            next();
        } catch (error) {
            console.log("VerifyRole : " + error);
            res.status(500).json("SERVER ERROR!!");
        }
    }
}

export default VerifyAuth;