import db from "../db.js";
import validater from "../validate.js"
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";
const list = db.collection("todo");
console.log("todo created")

export default {
    async read(ctx){
        try{
            var value = await list.find({_id: ObjectId(ctx.params.id)}); 
            console.log(value)
            ctx.response.body =  value;      
        } catch (error) {
            ctx.response.status = 404;
            ctx.response.body = {"error":"User is not avilable!"}
        }
    },
    async write(ctx){
        var value = await validater.validateTodo(ctx);
        console.log(value);
        if (value) {
            // console.log(value)
            var insertOn = await list.insertOne(value);
            ctx.response.body = "Sucessfully You put Your todo";
        }
    },
    async change(ctx){
        var value = await validater.validateUpdate(ctx);
        if (value) {
        var find1 = await list.find({_id: ObjectId(ctx.params.id)})
        console.log(find1,"1")
        if (find1.length){    
            if (value){
                console.log(value)
                var valId = ctx.params.id
                var upDate = await list.updateOne({ _id: { "$oid": valId } },{ $set: value })
                ctx.response.body = { message : "updated", upDate };
            }
            } else {
                ctx.response.status = 404;
                ctx.response.body = {error : "This user name is not defined"}
            }
        } else
            { 
                ctx.response.body = {error : "This user name is not defined!"
            }
        }
    },
    async throw (ctx){
        var value = await list.find({_id: ObjectId(ctx.params.id)})
        if (value){
            await list.deleteOne({_id: ObjectId(ctx.params.id)})
            ctx.response.body = {msg:"Deleted Todo"}
        }
    }
}