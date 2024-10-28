import mysql from 'mysql2/promise'
export default class con{
    private static instanse: Promise<mysql.Connection>;

    constructor(){
        console.log("Connection start")
        if(!con.instanse){
            console.log('Added connection')
            con.instanse = mysql.createConnection({
                'host':'127.0.0.1',
                'port':3306,
                'user':'root',
                'password':'',
                'database':'bir',
                'rowsAsArray':true
            })
            
        }
    }
    public static get_con():Promise<mysql.Connection> {
        if(this.instanse)
            return this.instanse;
        else 
            new con();
 
        return this.instanse;

    }
}