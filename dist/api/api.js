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
const client_1 = __importDefault(require("../controllers/client"));
const router = (0, express_1.default)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new client_1.default({ 'id': 1, "full_name": "new full_name" });
    // user.set_full_name("New full_name");
    yield user.get_by_id().then((data) => {
    }).catch((err) => {
    });
    try {
        let res = yield user.update();
        console.log(res);
    }
    catch (err) {
        console.log(err);
        // res.send(false)
        return;
    }
    // let user = new client({'full_name':"Insert test", 'address':'aaa','phone_number':'909090'});
    // await user.get_by_id().then((data)=>{
    //     console.log(data[0][1])
    // }).catch(async (err)=>{
    //     console.log(err)
    //     return;
    // });
    // try{
    //     let users = await user.get_by_id();
    //     console.log(users)
    // }catch(err){
    //     console.log(err)
    // }
    // let all_users = await user.get_all();
    // all_users.forEach(el => {
    //     console.log(el);
    // });
    // let result = await user.insert();
    // console.log(result.affectedRows)
    // console.log(user);
    // user.set_id(result.insertId);
    // console.log(user);
    // let us = await user.get_by_id().catch((err)=>{
    //     console.log(err);
    //     return;
    // });
    // console.log(us)
}));
exports.default = router;
