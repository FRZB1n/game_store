import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import game from "../controllers/game";

export default interface IGameRow extends RowDataPacket{
    id: number;
    name: string;
}
interface GameGetOptions {
    id?: number;
    name?:string;
}



export default class game_db{
    // private table = 'clients'
    private static con:Promise<mysql.Connection>
    constructor(){
        game_db.con = con.get_con();
    }

    public async get(options: GameGetOptions):Promise<IGameRow[]>{
        
        let sql:string = "SELECT * FROM `games` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.name){
            sql+=" AND `name` = ?"
            params.push(options.name)
        }
    
        const [res, fl] = await (await game_db.con).query(
            sql,
            params
        )
        
        return res as IGameRow[];

    }
    public async insert(obj:game):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `games`(`name`) VALUES (?)"
        const [results, fields] = await (await game_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name()
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:game):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `games` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await game_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }



}