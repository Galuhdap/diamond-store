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
const dbMysql_1 = __importDefault(require("../config/dbMysql"));
class TopUp {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM topup`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.getId = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = ` SELECT * FROM topup WHERE id_topup = '${id}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.insertTopup = (id_game, id_payment, diamond) => __awaiter(this, void 0, void 0, function* () {
            const Query = `INSERT INTO topup SET id_game = ${id_game} , id_payment = ${id_payment}, diamond = ${diamond}`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
    }
}
exports.default = TopUp;
