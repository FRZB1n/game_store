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
class area_db {
    constructor() {
        area_db.con = Connect_1.default.get_con();
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `areas` WHERE 1=1 ";
            let params = [];
            if (options.id) {
                sql += "AND `id` = ?";
                params.push(options.id);
            }
            if (options.name) {
                sql += " AND `name` = ?";
                params.push(options.name);
            }
            const [res, fl] = yield (yield area_db.con).query(sql, params);
            return res;
        });
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `areas`(`name`) VALUES (?)";
            const [results, fields] = yield (yield area_db.con).query(sql, [
                obj.get_name() == undefined ? '' : obj.get_name()
            ]);
            return results;
        });
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE `areas` SET ";
            let params = [];
            if (obj.get_name() != undefined) {
                sql += "`name` = ?,";
                params.push(obj.get_name());
            }
            sql += " `id`= ? WHERE `id` = ?";
            params.push(obj.get_id(), obj.get_id());
            console.log(sql);
            const [res, f] = yield (yield area_db.con).query(sql, params);
            return res;
        });
    }
}
exports.default = area_db;
