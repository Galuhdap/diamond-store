"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router/Router"));
const GameModel_1 = __importDefault(require("../model/GameModel"));
class GameController extends Router_1.default {
    constructor() {
        super();
        this.model = new GameModel_1.default;
        this.router.get('/game', this.getId.bind(this));
        this.router.get('/game/:id', this.getById.bind(this));
        this.router.post('/game', this.createGame.bind(this));
        this.router.delete('/game/:id', this.deleteGame.bind(this));
    }
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.model.getAll();
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.getId(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    createGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name_game } = req.body;
                const user = yield this.model.insertGame(name_game);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.model.deleteGame(id);
                res.status(200).json({ user });
            }
            catch (error) {
                res.status(500).json("SERVER ERROR!!");
            }
        });
    }
}
exports.default = GameController;
