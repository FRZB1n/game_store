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
class goods_db {
    constructor() {
        goods_db.con = Connect_1.default.get_con();
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `goods` WHERE 1=1 ";
            let params = [];
            if (options.id) {
                sql += "AND `id` = ?";
                params.push(options.id);
            }
            if (options.name) {
                sql += " AND `name` = ?";
                params.push(options.name);
            }
            if (options.provider_id) {
                sql += " AND `provider_id` = ?";
                params.push(options.provider_id);
            }
            if (options.unit_price) {
                sql += " AND `unit_price` = ?";
                params.push(options.unit_price);
            }
            if (options.unit) {
                sql += " AND `unit` = ?";
                params.push(options.unit);
            }
            if (options.area_id) {
                sql += " AND `area_id` = ?";
                params.push(options.area_id);
            }
            if (options.amount) {
                sql += " AND `amount` = ?";
                params.push(options.amount);
            }
            const [res, fl] = yield (yield goods_db.con).query(sql, params);
            return res;
        });
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `goods` (`name`,`provider_id`,`unit_price`,`unit`,`area_id`,`amount`) VALUES (?,?,?,?,?,?)";
            const [results, fields] = yield (yield goods_db.con).query(sql, [
                obj.get_name() == undefined ? '' : obj.get_name(),
                obj.get_provider_id() == undefined ? '' : obj.get_provider_id(),
                obj.get_unit_price() == undefined ? '' : obj.get_unit_price(),
                obj.get_unit() == undefined ? '' : obj.get_unit(),
                obj.get_area_id() == undefined ? '' : obj.get_area_id(),
                obj.get_amount() == undefined ? '' : obj.get_amount(),
            ]);
            return results;
        });
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE `employees` SET ";
            let params = [];
            if (obj.get_name() != undefined) {
                sql += "`name` = ?,";
                params.push(obj.get_name());
            }
            if (obj.get_provider_id() != undefined) {
                sql += "`provider_id` = ?,";
                params.push(obj.get_provider_id());
            }
            if (obj.get_unit_price() != undefined) {
                sql += "`unit_price` = ?,";
                params.push(obj.get_unit_price());
            }
            if (obj.get_unit() != undefined) {
                sql += "`unit` = ?,";
                params.push(obj.get_unit());
            }
            if (obj.get_area_id() != undefined) {
                sql += "`area_id` = ?,";
                params.push(obj.get_area_id());
            }
            if (obj.get_amount() != undefined) {
                sql += "`amount` = ?,";
                params.push(obj.get_amount());
            }
            sql += " `id`= ? WHERE `id` = ?";
            params.push(obj.get_id(), obj.get_id());
            console.log(sql);
            const [res, f] = yield (yield goods_db.con).query(sql, params);
            return res;
        });
    }
}
exports.default = goods_db;
