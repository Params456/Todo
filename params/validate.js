export default {

    async validate(ctx){
    var {value} =  await ctx.request.body();
    console.log(value)
        if (Object.keys(value).length === 0){ 
            ctx.response.status = 400;
            ctx.response.body = {error : "Please provide req data"}
            return;
       }
       var a = ['email','password','name']
       var arr = [];
       var status;
       for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }

       }
    if (status){
        ctx.response.status = 404;
        ctx.response.body = {arr};
        return false;
    }

    return value;
    },

    async validateUpdate (ctx){
        var {value} =  await ctx.request.body();
        let r = 0
        for (var i in value){
            if (value[i] === ""){
                r+=1
            }
        }
        if (!value || Object.keys(value).length === 0 || r!==0){ 
            ctx.response.status = 400;
            ctx.response.body = {error : "Please provide req data"}
            return false;
        }else{
            return value;
        }
       

    },
    async validateLogin(ctx){
        var {value} =  await ctx.request.body();
        if (Object.keys(value).length === 0){ 
                ctx.response.status = 400;
                ctx.response.body = {error : "Please provide req data"}
                return;
        }
        var a = ['email','password']
        var arr = [];
        var status;
        for (var i of a){
            if (!value[i]){
                status = 422; //required
                arr.push({error : `${i} required`})
            }

        }
        if (status){
            ctx.response.status = 404;
            ctx.response.body = {arr};
            return false;
        }else{
            return value;
        }
    },
    async validateTodo (ctx){
        var {value} = await ctx.request.body();

        if (Object.keys(value).length === 0){
            ctx.response.status = 400;
            ctx.response.body = "give the data's"
            return false;
        }
        var a = ['todoName','finished','name']
        var arr = [];
        var status;
        for (var i of a){
             if (!value[i]){
                 status = 422; //required
                 arr.push({error : `${i} required`})
             }
 
        }
     if (status){
         ctx.response.status = 404;
         ctx.response.body = {arr};
         console.log(arr)
         return false;
     }else{
        return value;
     }

    }
}