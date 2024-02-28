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
const Connect_1 = __importDefault(require("../Services/Connect"));
class orders_db {
    constructor() {
        orders_db.con = Connect_1.default.get_con();
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `orders` WHERE 1=1 ";
            let params = [];
            if (options.id) {
                sql += "AND `id` = ?";
                params.push(options.id);
            }
            if (options.employee_id) {
                sql += " AND `employee_id` = ?";
                params.push(options.employee_id);
            }
            if (options.client_id) {
                sql += " AND `client_id` = ?";
                params.push(options.client_id);
            }
            const [res, fl] = yield (yield orders_db.con).query(sql, params);
            return res;
        });
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `orders`(`employee_id`,`client_id`) VALUES (?, ?)";
            const [results, fields] = yield (yield orders_db.con).query(sql, [
                obj.get_employee_id() == undefined ? '' : obj.get_employee_id(),
                obj.get_client_id() == undefined ? '' : obj.get_client_id(),
            ]);
            return results;
        });
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE `orders` SET ";
            let params = [];
            if (obj.get_employee_id() != undefined) {
                sql += "`employee_id` = ?,";
                params.push(obj.get_employee_id());
            }
            if (obj.get_client_id() != undefined) {
                sql += "`client_id` = ?,";
                params.push(obj.get_client_id());
            }
            sql += " `id`= ? WHERE `id` = ?";
            params.push(obj.get_id(), obj.get_id());
            console.log(sql);
            const [res, f] = yield (yield orders_db.con).query(sql, params);
            return res;
        });
    }
}
exports.default = orders_db;
