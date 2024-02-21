"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
class con {
    constructor() {
        console.log("Connection start");
        if (!con.instanse) {
            console.log('Added connection');
            con.instanse = promise_1.default.createConnection({
                'host': '127.0.0.1',
                'port': 3306,
                'user': 'root',
                'password': '',
                'database': 'storage',
                'rowsAsArray': true
            });
        }
    }
    static get_con() {
        if (this.instanse)
            return this.instanse;
        else
            new con();
        return this.instanse;
    }
}
exports.default = con;
