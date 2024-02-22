import { ResultSetHeader } from "mysql2/promise";
import orders_db from "../models/order"
import IOrdersRow from "../models/order";



interface OrdersGetOptions {
    id?: number;
    employee_id?: number;
    client_id?: number;
}




export default class orders{

    private id?: number;
    private employee_id?: number;
    private client_id?: number;

    private db:orders_db;
    constructor(options:OrdersGetOptions){
        this.id = options.id;
        this.employee_id = options.employee_id;
        this.client_id = options.client_id;
      
        this.db = new orders_db();
    }
    public to_map(data:IOrdersRow[]):Array<OrdersGetOptions>{
        let ord:Array<OrdersGetOptions> = [];
        
        data.forEach(el => {
            let buf:OrdersGetOptions={};
            buf.id = el[0];
            buf.employee_id = el[1];
            buf.client_id = el[1];
            ord.push(buf)

            
        });
        return ord;
    }
    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty order id")
    }


    public async get_by_current_params():Promise<IOrdersRow[]>{
        var params:OrdersGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.employee_id)
            params.employee_id = this.employee_id
        if(this.client_id)
            params.client_id = this.client_id
        
            
        
        if(!params.employee_id&&!params.id&&!params.client_id)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as OrdersGetOptions);
    }

    public async get_all():Promise<IOrdersRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IOrdersRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty order id")
    }
    public async get_by_employee_id():Promise<IOrdersRow[]>{
        if(this.employee_id)
            return await this.db.get({'employee_id':this.employee_id});
        else
            return Promise.reject("Empty order employee_id")
    }
    public async get_by_client_id():Promise<IOrdersRow[]>{
        if(this.client_id)
            return await this.db.get({'client_id':this.client_id});
        else
            return Promise.reject("Empty order client_id")
    }

    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }


    public set_id(id:number):void{
        this.id = id;
    }
    public set_employee_id(employee_id:number):void{
        this.employee_id = employee_id;
    }
    public set_client_id(client_id:number):void{
        this.client_id = client_id;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_employee_id():number|undefined{
        return this.employee_id;
    }
    public get_client_id():number|undefined{
        return this.client_id;
    }



}