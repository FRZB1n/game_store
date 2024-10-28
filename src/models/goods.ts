import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import goods from '../controllers/goods'


export default interface IGoodsRow extends RowDataPacket{
    id: number;
    name: string;
    seller:number;
    description:string;
    cost:number;
    game_id:number;
    amount:number;
}
interface GoodsGetOptions {
    id?: number;
    name?: string;
    seller?:number;
    description?:string;
    cost?:number;
    game_id?:number;
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
        if(options.seller){
            sql+=" AND `seller` = ?"
            params.push(options.seller)
        }
        if(options.cost){
            sql+=" AND `cost` = ?"
            params.push(options.cost)
        }
        if(options.description){
            sql+=" AND `description` = ?"
            params.push(options.description)
        }
        if(options.game_id){
            sql+=" AND `game_id` = ?"
            params.push(options.game_id)
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
        let sql:string = "INSERT INTO `goods` (`name`,`seller`,`cost`,`description`,`game_id`,`amount`) VALUES (?,?,?,?,?,?)"
        const [results, fields] = await (await goods_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name(),
            obj.get_seller() == undefined ? '' : obj.get_seller(),
            obj.get_cost() == undefined ? '' : obj.get_cost(),
            obj.get_description() == undefined ? '' : obj.get_description(),
            obj.get_game_id() == undefined ? '' : obj.get_game_id(),
            obj.get_amount() == undefined ? '' : obj.get_amount(),
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:goods):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `goods` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        if(obj.get_seller() != undefined){
            sql+="`seller` = ?,";
            params.push(obj.get_seller());
        }
        if(obj.get_cost() != undefined){
            sql+="`cost` = ?,";
            params.push(obj.get_cost());
        }
        if(obj.get_description() != undefined){
            sql+="`description` = ?,";
            params.push(obj.get_description());
        }
        if(obj.get_game_id() != undefined){
            sql+="`game_id` = ?,";
            params.push(obj.get_game_id());
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