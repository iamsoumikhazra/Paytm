import express from "express";
import { homeRouter, errorRouter} from "./routers/router.index.js";

const app = express();

app.use('/', homeRouter)
app.use('/error',errorRouter)

export default app;