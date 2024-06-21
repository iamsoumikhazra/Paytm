import express from "express";
import { homeRouter, errorRouter, signupRouter, signinRouter, userRouter, updateRouter} from "./routers/router.index.js";
import cors from "cors";
const app = express();

app.use(cors())
app.use(express.json());


app.use('/', homeRouter)
app.use('/signup',signupRouter)
app.use('/signin',signinRouter)
app.use('/users',userRouter)
app.use('/update',updateRouter)

app.use('/error',errorRouter)
export default app;