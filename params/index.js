import { Application } from "https://deno.land/x/oak/mod.ts";
import notFound from "./404.ts"

const app = new Application();

import router from "./router/router.js"

app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound)

var port = 8000;

app.listen({port:port})

console.log(`Server started at ${port}`)