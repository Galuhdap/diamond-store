import { Request, Response } from "express";
import Routers from "./Router/Router";
import Game from "../model/GameModel";


class GameController extends Routers {

    model = new Game;

    constructor(){
        super();
        this.router.get('/game', this.getId.bind(this));
        this.router.get('/game/:id', this.getById.bind(this));
        this.router.post('/game', this.createUser.bind(this));
        this.router.delete('/game/:id', this.deleteGame.bind(this));
    }

    async getId(req:Request, res:Response){
        try {
            const user = await this.model.getAll();
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async getById(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.getId(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
    async createUser(req:Request, res:Response){
        try {
            const {name_game} = req.body
            const user = await this.model.insertGame(name_game)
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }

    async deleteGame(req:Request, res:Response){
        try {
            const id = req.params.id;
            const user = await this.model.deleteGame(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json("SERVER ERROR!!");
        }
    }
    
}

export default GameController;