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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
class Firebase {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            const firebaseConfig = {
                apiKey: "AIzaSyDAudwkoXCl4B7gxC57GDw-l8Sp_-COvz0",
                authDomain: "diamondstore-64aaa.firebaseapp.com",
                projectId: "diamondstore-64aaa",
                storageBucket: "diamondstore-64aaa.appspot.com",
                messagingSenderId: "303687088760",
                appId: "1:303687088760:web:c0e37fedfad94eeb40cb8d"
            };
            (0, app_1.initializeApp)(firebaseConfig);
        });
    }
}
exports.default = Firebase;
