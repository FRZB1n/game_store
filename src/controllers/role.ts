import { ResultSetHeader } from "mysql2/promise";
import role_db from "../models/role"
import IRoleRow from "../models/role";



interface RoleGetOptions {
    id?: number;
    name?:string;
}



/**Area controller class */
export default class role{

    private id?:number;
    private name?: string;

    private db:role_db;
    /** 
     * Class contructor
     * 
     * @param options requires id and name.
     * 
     *  
        */
    constructor(options:RoleGetOptions){
        this.id = options.id;
        this.name = options.name;
      
        this.db = new role_db();
    }
    /** This is a description of the foo function. */
    public to_map(data:IRoleRow[]):Array<RoleGetOptions>{
        let areas:Array<RoleGetOptions> = [];
        
        data.forEach(el => {
            let buf:RoleGetOptions={};
            buf.id = el[0];
            buf.name = el[1];
            areas.push(buf)

            
        });
        return areas;
    }

    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty role id")
    }


    public async get_by_current_params():Promise<IRoleRow[]>{
        var params:RoleGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.name)
            params.name = this.name
        
            
        
        if(!params.name&&!params.id)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as RoleGetOptions);
    }

    public async get_all():Promise<IRoleRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IRoleRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty role id")
    }
    public async get_by_name():Promise<IRoleRow[]>{
        if(this.name)
            return await this.db.get({'name':this.name});
        else
            return Promise.reject("Empty role name")
    }

    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }

    public set_id(id:number):void{
        this.id = id;
    }
    public set_name(name:string):void{
        this.name = name;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_name():string|undefined{
        return this.name;
    }
}