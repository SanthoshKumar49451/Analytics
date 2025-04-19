import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

import express from 'express'
import connectDb from './config/dbConnect.js'
import router from './route/route.js';


const app=express()
app.use(cors())
app.use(express.json())
const PORT=4000


app.get('/',(req,res)=>{
    res.send("app working")
})
app.use('/api',router)
connectDb()
.then(()=>app.listen(PORT))
.catch((e)=>console.log(e))


