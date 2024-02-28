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
class employees_db {
    constructor() {
        employees_db.con = Connect_1.default.get_con();
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `employees` WHERE 1=1 ";
            let params = [];
            if (options.id) {
                sql += "AND `id` = ?";
                params.push(options.id);
            }
            if (options.full_name) {
                sql += " AND `full_name` = ?";
                params.push(options.full_name);
            }
            if (options.post) {
                sql += " AND `post` = ?";
                params.push(options.post);
            }
            if (options.phone_number) {
                sql += " AND `phone_number` = ?";
                params.push(options.phone_number);
            }
            const [res, fl] = yield (yield employees_db.con).query(sql, params);
            return res;
        });
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `employees` (`full_name`,`post`,`phone_number`) VALUES (?,?,?)";
            const [results, fields] = yield (yield employees_db.con).query(sql, [
                obj.get_full_name() == undefined ? '' : obj.get_full_name(),
                obj.get_post() == undefined ? '' : obj.get_post(),
                obj.get_phone_number() == undefined ? '' : obj.get_phone_number(),
            ]);
            return results;
        });
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE `employees` SET ";
            let params = [];
            if (obj.get_full_name() != undefined) {
                sql += "`full_name` = ?,";
                params.push(obj.get_full_name());
            }
            if (obj.get_post() != undefined) {
                sql += "`post` = ?,";
                params.push(obj.get_post());
            }
            if (obj.get_phone_number() != undefined) {
                sql += "`phone_number` = ?,";
                params.push(obj.get_phone_number());
            }
            sql += " `id`= ? WHERE `id` = ?";
            params.push(obj.get_id(), obj.get_id());
            console.log(sql);
            const [res, f] = yield (yield employees_db.con).query(sql, params);
            return res;
        });
    }
}
exports.default = employees_db;
