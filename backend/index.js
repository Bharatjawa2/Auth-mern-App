const express=require('express');
const app=express();
const bodyparser=require('body-parser')
const AuthRouter=require('./Router/AuthRouter')
const ProductRouter=require('./Router/ProductRouter')
const cors=require('cors')
require('dotenv').config()
require('./Models/db')
const PORT=process.env.PORT || 8080;


app.get('/pong',(req,res)=>{
    res.send("PONG");
})

app.use(bodyparser.json());
app.use(cors());


app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} `);
})

