import { ResultSetHeader } from "mysql2/promise";
import goods_in_orders_db from "../models/goods_in_orders"
import IGoodsInOrdersRow from "../models/goods_in_orders";



interface GoodsInOrdersGetOptions {
    id?: number;
    order_id?: number;
    good_id?: number;
}




export default class goods_in_orders{

    private id?: number;
    private order_id?: number;
    private good_id?: number;

    private db:goods_in_orders_db;
    constructor(options:GoodsInOrdersGetOptions){
        this.id = options.id;
        this.order_id = options.order_id;
        this.good_id = options.good_id;
      
        this.db = new goods_in_orders_db();
    }
    public to_map(data:IGoodsInOrdersRow[]):Array<GoodsInOrdersGetOptions>{
        let GoInOr:Array<GoodsInOrdersGetOptions> = [];
        
        data.forEach(el => {
            let buf:GoodsInOrdersGetOptions={};
            buf.id = el[0];
            buf.order_id = el[1];
            buf.good_id = el[1];
            GoInOr.push(buf)

            
        });
        return GoInOr;
    }
    public async update():Promise<ResultSetHeader>{
        if(this.id)
            return await this.db.update(this);
        else
            return Promise.reject("Empty id")
    }


    public async get_by_current_params():Promise<IGoodsInOrdersRow[]>{
        var params:GoodsInOrdersGetOptions = {};
         
        if(this.id)
            params.id = this.id
        if(this.order_id)
            params.order_id = this.order_id
        if(this.good_id)
            params.good_id = this.good_id
        
            
        
        if(!params.order_id&&!params.id&&!params.order_id)
            return Promise.reject("No params set");
        else
            return await this.db.get(params as GoodsInOrdersGetOptions);
    }

    public async get_all():Promise<IGoodsInOrdersRow[]>{
        return await this.db.get({});
    }

    public async get_by_id():Promise<IGoodsInOrdersRow[]>{
        if(this.id)
            return await this.db.get({'id':this.id})
        else
            return Promise.reject("Empty area id")
    }
    public async get_by_order_id():Promise<IGoodsInOrdersRow[]>{
        if(this.order_id)
            return await this.db.get({'order_id':this.order_id});
        else
            return Promise.reject("Empty order_id")
    }
    public async get_by_good_id():Promise<IGoodsInOrdersRow[]>{
        if(this.good_id)
            return await this.db.get({'good_id':this.good_id});
        else
            return Promise.reject("Empty good_id")
    }

    public async insert():Promise<ResultSetHeader>{
        return await this.db.insert(this);
    }


    public set_id(id:number):void{
        this.id = id;
    }
    public set_order_id(name:number):void{
        this.order_id = this.order_id;
    }
    public set_good_id(name:number):void{
        this.good_id = this.good_id;
    }

    public get_id():number|undefined{
        return this.id;
    }
    public get_order_id():number|undefined{
        return this.order_id;
    }
    public get_good_id():number|undefined{
        return this.good_id;
    }



}