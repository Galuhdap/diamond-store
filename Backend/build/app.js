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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const User_1 = __importDefault(require("./controller/User"));
const TopUp_1 = __importDefault(require("./controller/TopUp"));
const Player_1 = __importDefault(require("./controller/Player"));
const Payment_1 = __importDefault(require("./controller/Payment"));
const Game_1 = __importDefault(require("./controller/Game"));
const Auth_1 = __importDefault(require("./controller/Auth"));
const dbMysql_1 = __importDefault(require("./config/dbMysql"));
const firebase_1 = __importDefault(require("./config/firebase"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = 3200;
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: "localhost:3000"
    }));
    app.use(new User_1.default().router);
    app.use(new TopUp_1.default().router);
    app.use(new Player_1.default().router);
    app.use(new Payment_1.default().router);
    app.use(new Game_1.default().router);
    app.use(new Auth_1.default().router);
    yield dbMysql_1.default.init();
    yield firebase_1.default.init();
    app.get('/', (req, res) => res.send('Hello World!'));
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}))();
