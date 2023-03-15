import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { initializeApp } from "firebase/app";

import UserController from './controller/User';
import TopupController from './controller/TopUp';
import PlayerController from './controller/Player';
import PaymentController from './controller/Payment';
import GameController from './controller/Game';
import AuthController from './controller/Auth';
import dbMysql from './config/dbMysql';
import Firebase from './config/firebase';
import VerifyAuth from './middleware/verifyAuth';



(async ()=> {

    const app = express()
    const port = 3200
    
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin:"localhost:3000"
    }));

    // app.use(session(
        
    // ));

    app.use(new UserController().router);
    app.use(new TopupController().router);
    app.use(new PlayerController().router);
    app.use(new PaymentController().router);
    app.use(new GameController().router);
    app.use(new AuthController().router);
    app.use(new VerifyAuth().router);

    await dbMysql.init();
    await Firebase.init()

    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})();