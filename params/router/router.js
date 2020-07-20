import { Router } from "https://deno.land/x/oak/mod.ts";
import controller from "../controller/controlle.js"
import controller1 from "../controller/ authControler.js"
import token from "../jwt/verify.js";

var router = new Router();

router
    .post("/signup",controller.write)
    .post("/login",controller.login)
    .delete("/delete",controller.delete)
    .patch("/rewrite/:id",token,controller.rewrite)
    .post("/todo",token,controller1.write)
    .patch("/change/:id",token,controller1.change)
    .get("/get/:id",token,controller1.read)
    .delete("/throw/:id",token,controller1.throw)

export default router;