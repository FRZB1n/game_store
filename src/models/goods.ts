import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import goods from '../controllers/goods'


export default interface IGoodsRow extends RowDataPacket{
    id: number;
    name: string;
    provider_id:number;
    unit_price:number;
    unit:string;
    area_id:number;
    amount:number;
}
interface GoodsGetOptions {
    id?: number;
    name?: string;
    provider_id?:number;
    unit_price?:number;
    unit?:string;
    area_id?:number;
    amount?:number;
}


export default class goods_db{
    // private table = 'goods'
    private static con:Promise<mysql.Connection>
    constructor(){
        goods_db.con = con.get_con();
    }

    public async get(options: GoodsGetOptions):Promise<IGoodsRow[]>{
        
        let sql:string = "SELECT * FROM `goods` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.name){
            sql+=" AND `name` = ?"
            params.push(options.name)
        }
        if(options.provider_id){
            sql+=" AND `provider_id` = ?"
            params.push(options.provider_id)
        }
        if(options.unit_price){
            sql+=" AND `unit_price` = ?"
            params.push(options.unit_price)
        }
        if(options.unit){
            sql+=" AND `unit` = ?"
            params.push(options.unit)
        }
        if(options.area_id){
            sql+=" AND `area_id` = ?"
            params.push(options.area_id)
        }
        if(options.amount){
            sql+=" AND `amount` = ?"
            params.push(options.amount)
        }
    
        const [res, fl] = await (await goods_db.con).query(
            sql,
            params
        )
        
        return res as IGoodsRow[];

    }
    public async insert(obj:goods):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `goods` (`name`,`provider_id`,`unit_price`,`unit`,`area_id`,`amount`) VALUES (?,?,?,?,?,?)"
        const [results, fields] = await (await goods_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name(),
            obj.get_provider_id() == undefined ? '' : obj.get_provider_id(),
            obj.get_unit_price() == undefined ? '' : obj.get_unit_price(),
            obj.get_unit() == undefined ? '' : obj.get_unit(),
            obj.get_area_id() == undefined ? '' : obj.get_area_id(),
            obj.get_amount() == undefined ? '' : obj.get_amount(),
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:goods):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `employees` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        if(obj.get_provider_id() != undefined){
            sql+="`provider_id` = ?,";
            params.push(obj.get_provider_id());
        }
        if(obj.get_unit_price() != undefined){
            sql+="`unit_price` = ?,";
            params.push(obj.get_unit_price());
        }
        if(obj.get_unit() != undefined){
            sql+="`unit` = ?,";
            params.push(obj.get_unit());
        }
        if(obj.get_area_id() != undefined){
            sql+="`area_id` = ?,";
            params.push(obj.get_area_id());
        }
        if(obj.get_amount() != undefined){
            sql+="`amount` = ?,";
            params.push(obj.get_amount());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await goods_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }



}