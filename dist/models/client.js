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
class client_db {
    constructor() {
        client_db.con = Connect_1.default.get_con();
    }
    update(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "UPDATE `clients` SET ";
            let params = [];
            if (obj.get_full_name() != undefined) {
                sql += "`full_name` = ?,";
                params.push(obj.get_full_name());
            }
            if (obj.get_email() != undefined) {
                sql += "`email` = ?,";
                params.push(obj.get_email());
            }
            if (obj.get_address() != undefined) {
                sql += "`address` = ?,";
                params.push(obj.get_address());
            }
            if (obj.get_phone_number() != undefined) {
                sql += "`phone_number` = ?,";
                params.push(obj.get_phone_number());
            }
            sql += " `id`= ? WHERE `id` = ?";
            params.push(obj.get_id(), obj.get_id());
            console.log(sql);
            const [res, f] = yield (yield client_db.con).query(sql, params);
            return res;
        });
    }
    insert(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "INSERT INTO `clients`(`full_name`, `email`, `address`, `phone_number`) VALUES (?,?,?,?)";
            const [results, fields] = yield (yield client_db.con).query(sql, [
                obj.get_full_name() == undefined ? '' : obj.get_full_name(),
                obj.get_email() == undefined ? '' : obj.get_email(),
                obj.get_address() == undefined ? '' : obj.get_address(),
                obj.get_phone_number() == undefined ? '' : obj.get_phone_number()
            ]);
            return results;
        });
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = "SELECT * FROM `clients` WHERE 1=1 ";
            let params = [];
            if (options.id) {
                sql += "AND `id` = ?";
                params.push(options.id);
            }
            if (options.full_name) {
                sql += " AND `full_name` = ?";
                params.push(options.full_name);
            }
            if (options.email) {
                sql += " AND `email` = ?";
                params.push(options.email);
            }
            if (options.address) {
                sql += " AND `address` = ?";
                params.push(options.address);
            }
            if (options.phone_number) {
                sql += " AND `phone_number` = ?";
                params.push(options.phone_number);
            }
            const [res, fl] = yield (yield client_db.con).query(sql, params);
            return res;
        });
    }
}
exports.default = client_db;
