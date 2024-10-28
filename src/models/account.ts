import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import account from "../controllers/account";

export default interface IAccountRow extends RowDataPacket{
    id: number;
    name: string;
    pass: string;
    email: string;
    cost:number;
    game: number;
    description: string;

    seller: number;
    buyer:number;

}
interface AccountGetOptions {
    id?: number;
    name?: string;
    pass?: string;
    email?: string;
    cost?:number;
    game?: number;
    description?: string;

    seller?: number;
    buyer?: number;
}

export default class acc_db{
    private static con:Promise<mysql.Connection>
    constructor(){
        acc_db.con = con.get_con();
    }

    public async get(options: AccountGetOptions):Promise<IAccountRow[]>{
        
        let sql:string = "SELECT * FROM `accounts` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.name){
            sql+=" AND `name` = ?"
            params.push(options.name)
        }
        if(options.pass){
            sql+=" AND `pass` = ?"
            params.push(options.pass)
        }
        if(options.email){
            sql+=" AND `email` = ?"
            params.push(options.email)
        }
        if(options.cost){
            sql+=" AND `cost` = ?"
            params.push(options.cost)
        }
        if(options.game){
            sql+=" AND `game` = ?"
            params.push(options.game)
        }
        if(options.description){
            sql+=" AND `decription` = ?"
            params.push(options.description)
        }
        if(options.seller){
            sql+=" AND `seller` = ?"
            params.push(options.seller)
        }
        const [res, fl] = await (await acc_db.con).query(
            sql,
            params
        )
        
        return res as IAccountRow[];

    }
    public async insert(obj:account):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `accounts` (`name`, `pass`, `email`, `cost`, `game`, `description`, `seller`, `buyer`) VALUES ('?','?','?','?','?','?','?','?')"
        const [results, fields] = await (await acc_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name(),
            obj.get_pass()== undefined ? '' : obj.get_pass(),
            obj.get_email()== undefined ? '' : obj.get_email(),
            obj.get_cost()== undefined ? '' : obj.get_cost(),
            obj.get_game()== undefined ? '' : obj.get_game(),
            obj.get_description()== undefined ? '' : obj.get_description(),
            obj.get_seller()== undefined ? '' : obj.get_seller(),
        ])
        return results as ResultSetHeader;
        
    }
    public async update (obj:account):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `accounts` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        if(obj.get_pass() != undefined){
            sql+="`pass` = ?,";
            params.push(obj.get_pass());
        }
        if(obj.get_email() != undefined){
            sql+="`email` = ?,";
            params.push(obj.get_email());
        }
        if(obj.get_cost() != undefined){
            sql+="`cost` = ?,";
            params.push(obj.get_cost());
        }
        if(obj.get_game() != undefined){
            sql+="`game` = ?,";
            params.push(obj.get_game());
        }
        if(obj.get_description() != undefined){
            sql+="`description` = ?,";
            params.push(obj.get_description());
        }
        if(obj.get_seller() != undefined){
            sql+="`seller` = ?,";
            params.push(obj.get_seller());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(), obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await acc_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }
}