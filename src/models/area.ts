import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import con from "../Services/Connect";
import area from "../controllers/area";

export default interface IAreaRow extends RowDataPacket{
    id: number;
    name: string;
}
interface AreaGetOptions {
    id?: number;
    name?:string;
}



export default class area_db{
    private static con:Promise<mysql.Connection>
    constructor(){
        area_db.con = con.get_con();
    }

    public async get(options: AreaGetOptions):Promise<IAreaRow[]>{
        
        let sql:string = "SELECT * FROM `areas` WHERE 1=1 ";
        let params = [];
        
        if(options.id){
            sql+="AND `id` = ?"
            params.push(options.id)
        }
        if(options.name){
            sql+=" AND `name` = ?"
            params.push(options.name)
        }
    
        const [res, fl] = await (await area_db.con).query(
            sql,
            params
        )
        
        return res as IAreaRow[];

    }
    public async insert(obj:area):Promise<ResultSetHeader>{
        let sql:string = "INSERT INTO `areas`(`name`) VALUES (?)"
        const [results, fields] = await (await area_db.con).query(sql,[
            obj.get_name() == undefined ? '' : obj.get_name()
        ])
        return results as ResultSetHeader;
        
    }

    public async update (obj:area):Promise<ResultSetHeader>{
        
        let sql:string = "UPDATE `areas` SET ";
        let params = [];
        if(obj.get_name() != undefined){
            sql+="`name` = ?,";
            params.push(obj.get_name());
        }
        
        sql += " `id`= ? WHERE `id` = ?"
        
        params.push(obj.get_id(),obj.get_id())
        
        console.log(sql)
        const [res, f] = await (await area_db.con).query(
            sql,
            params
        )
        return res as ResultSetHeader
    }



}