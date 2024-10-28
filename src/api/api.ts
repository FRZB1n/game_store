import Router, { Request, Response } from 'express';
import client from '../controllers/client';
import account from '../controllers/account';


const router = Router();

router.post('/kl', async (req:Request,res:Response)=>{
    const {id} = req.body;
    console.log(id);

    let new_acc = new account({
        name:"SUper mega acc",
        pass:"super mega pass",
        email:"super mega e,ail",
        cost:999,
        game:1,
        description:"super ,ega description",
        seller:1,
        buyer:2
    })
    await new_acc.insert().then(async (data)=>{
        console.log(data)
        res.send(data)
    })
    // let need_client = new client({
    //     role:0
    // })
    // await need_client.get_by_role().then(async (data)=>{
    //     // let f_good = client.to_map(data)
    //     console.log(data)
    //     res.send(data)
    // })

    // let new_client = new client({
    //     full_name:'asdd',
    //     email:'asasa@assw',
    //     address:"some adr",
    //     phone_number:'88000',
    //     role:1,
    //     balance:777,
    //     pass:'mega pass'
    // })
    // await new_client.insert().then(async (data)=>{
    //     console.log(data);
    //     if(data.affectedRows > 0)
    //         res.send("WELL DONE")
    //     else
    //         res.send("womop")
    // })
    // let good = new goods({"id":id});
    
    // await good.get_by_id().then(async (data)=>{
    //     let f_good = good.to_map(data)
        
    //     console.log("------------------------\nGOODS ELEMS:\n");
    //     f_good.forEach(el => {
    //         console.log(el)
    //     });
    //     let prov = new provider({"id":f_good[0].provider_id})
    //     await prov.get_by_id().then(async(data)=>{
    //         let n_prov = prov.to_map(data);
    //         console.log("------------------\nProviders:\n");
    //         n_prov.forEach(el => {
    //             console.log(el)
    //         });
    //     })
    //     let need_ord = new goods_in_orders({"good_id":f_good[0].id})
    //     await need_ord.get_by_good_id().then(async(data)=>{
    //         let f_orders = need_ord.to_map(data);
    //         console.log("-----------------\ng_in_ord:\n")
    //         f_orders.forEach(el => {
    //             console.log(el)
    //         });
    //         let mb_order = new orders({"id":f_orders[0].order_id})
    //         await mb_order.get_by_id().then(async(data)=>{
    //             let order = mb_order.to_map(data);
    //             console.log("-----------------\nORDER:\n")
    //             order.forEach(el => {
    //                 console.log(el)
    //             });
    //             let mb_employee = new employees({"id":order[0].employee_id});
    //             await mb_employee.get_by_id().then(async (data)=>{
    //                 let employee = mb_employee.to_map(data);
    //                 console.log("-----------------\nEmployee:\n")
    //                 employee.forEach(el => {
    //                     console.log(el.full_name)
    //                 });
    //             })
    //             let mb_client = new client({"id":order[0].client_id})
    //             await mb_client.get_by_id().then(async(data)=>{
    //                 let client = mb_client.to_map(data);
    //                 console.log("-----------------\nClient:\n")
    //                 client.forEach(el => {
    //                     console.log(el)
    //                 });
    //             })
    //         })
    //     })
    // }).catch((err)=>{
    //     console.log(err);
    // })


    // let new_empl = new employees({"full_name":"NEW EMPL", "phone_number":"NEW PHONE", "post":"MUZHIK"})
    // await new_empl.insert().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("WELL DONE")
    // })
    // await new_empl.update().then((data)=>{
    //     if(data.affectedRows > 0)
    //         res.send("E")
    // })

    // await new_empl.insert().then((data)=>{
    //     console.log(data)
    //     if(data.affectedRows > 0)
    //         res.send("Ed");
    // })
    
    // await new_empl.get_by_post().then((data)=>{
    //     let empls = new_empl.to_map(data);
    //     console.log(empls)
    // })

















    // let mb_area = new area({'id':1, "name":"Молочная продукция"})
    // await mb_area.get_by_id().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // await mb_area.insert().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_all().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_current_params().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.get_by_name().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // await mb_area.update().then((data)=>{
    //     console.log(data)
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // let mb_user = new client({});
    // let user = await mb_user.get_by_current_params().then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err)
    // });
    
    // let user = new client({'id':1,"full_name":"new full_name"})
    // user.set_full_name("New full_name");
    // user.set_full_name("las");
    // user.update();
    // let user = new client({'full_name':"Insert test", 'address':'aaa','phone_number':'909090'});
    // await user.get_by_id().then((data)=>{
    //     console.log(data[0][1])
    // }).catch(async (err)=>{
    //     console.log(err)
    //     return;
    // });
    // try{
    //     let users = await user.get_by_id();
    //     console.log(users)
    // }catch(err){
    //     console.log(err)
    // }
    
    // let all_users = await user.get_all();
    // all_users.forEach(el => {
    //     console.log(el);
    // });
    // let result = await user.insert();
    // console.log(result.affectedRows)
    
    // console.log(user);
    // user.set_id(result.insertId);
    // console.log(user);
    // let us = await user.get_by_id().catch((err)=>{
    //     console.log(err);
    //     return;
    // });
        
    // console.log(us)
  


})

export default router;