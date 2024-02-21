import { ResultSetHeader } from "mysql2/promise";
import employees_db from "../models/employees"
import IEmployeesRow from "../models/employees";



interface EmployeesGetOptions {
    id?: number;
    full_name?:string;
    post?:string;
    phone_number?:string;
}



export default class employees{
    private id?:number;
    private full_name?:string;
    private post?:string;
    private phone_number?:string;

    private db:employees_db;

    constructor(options:EmployeesGetOptions){
        this.id = options.id;
        this.full_name = options.full_name;
        this.post = options.post;
        this.phone_number = options.phone_number;
      
        this.db = new employees_db();
    }
    public to_map(data:IEmployeesRow[]):Array<EmployeesGetOptions>{
        let empl:Array<EmployeesGetOptions> = [];
        
        data.forEach(el => {
            let buf:EmployeesGetOptions={};
            buf.id = el[0];
            buf.full_name = el[1];
            buf.post = el[2];
            buf.phone_number = el[3];
            empl.push(buf)

            
        });
        return empl;
    }

    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty employee id")
    }


    public async get_by_current_params():Promise<IEmployeesRow[]>{
        var params:EmployeesGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.full_name)
            params.full_name = this.full_name
        if(this.post)
            params.post = this.post
        if(this.phone_number)
            params.phone_number = this.phone_number
        
            
        
        if(!params.full_name&&!params.id&&!params.post&&!params.phone_number)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as EmployeesGetOptions);
    }

    public async get_all():Promise<IEmployeesRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IEmployeesRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty employee id")
    }
    public async get_by_full_name():Promise<IEmployeesRow[]>{
        if(this.full_name)
            return await this.db.get({'full_name':this.full_name});
        else
            return Promise.reject("Empty empl full_name")
    }
    public async get_by_post():Promise<IEmployeesRow[]>{
        if(this.post)
            return await this.db.get({'post':this.post});
        else
            return Promise.reject("Empty empl post")
    }
    public async get_by_phone_number():Promise<IEmployeesRow[]>{
        if(this.full_name)
            return await this.db.get({'phone_number':this.phone_number});
        else
            return Promise.reject("Empty empl phone_number")
    }

    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }

    public set_id(id:number):void{
        this.id = id;
    }
    public set_full_name(full_name:string):void{
        this.full_name = full_name;
    }
    public set_post(post:string):void{
        this.post = post;
    }

    public set_phone_number(phone_number:string):void{
        this.phone_number = phone_number;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_full_name():string|undefined{
        return this.full_name;
    }
    public get_post():string|undefined{
        return this.post;
    }

    public get_phone_number():string|undefined{
        return this.phone_number;
    }

}
