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
class User {
    constructor() {
        this.getUser = () => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.getUserByid = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `SELECT * FROM users WHERE id_user = '${id}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.createUser = (email, hashpassword, role) => __awaiter(this, void 0, void 0, function* () {
            const Query = `INSERT INTO users SET email = '${email}', password = '${hashpassword}' , role = '${role}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.updateUser = (email, hashpassword, role, id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `UPDATE users SET email = '${email}', password = '${hashpassword}', role = '${role}' WHERE id_user = '${id}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const Query = `DELETE FROM users WHERE id_user = '${id}'`;
            const rows = yield dbMysql_1.default.DB.execute(Query);
            return rows;
        });
    }
}
exports.default = User;
