import { ResultSetHeader } from "mysql2/promise";
import area_db from "../models/area"
import IAreaRow from "../models/area";



interface AreaGetOptions {
    id?: number;
    name?:string;
}




export default class area{

    private id?:number;
    private name?: string;

    private db:area_db;

    constructor(options:AreaGetOptions){
        this.id = options.id;
        this.name = options.name;
      
        this.db = new area_db();
    }
    public to_map(data:IAreaRow[]):Array<AreaGetOptions>{
        let areas:Array<AreaGetOptions> = [];
        
        data.forEach(el => {
            let buf:AreaGetOptions={};
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
            return Promise.reject("Empty area id")
    }


    public async get_by_current_params():Promise<IAreaRow[]>{
        var params:AreaGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.name)
            params.name = this.name
        
            
        
        if(!params.name&&!params.id)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as AreaGetOptions);
    }

    public async get_all():Promise<IAreaRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IAreaRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty area id")
    }
    public async get_by_name():Promise<IAreaRow[]>{
        if(this.name)
            return await this.db.get({'name':this.name});
        else
            return Promise.reject("Empty area name")
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