import express from "express";
import { homeRouter, errorRouter, signupRouter, signinRouter} from "./routers/router.index.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

app.use('/', homeRouter)
app.use('/error',errorRouter)
app.use('/api',signupRouter)
app.use('/api',signinRouter)

export default app;