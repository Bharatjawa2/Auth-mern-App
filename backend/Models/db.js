const mongoose=require('mongoose')
const mong_url=process.env.MONGO_URL;

mongoose.connect(mong_url)
    .then(()=>{
        console.log('MONGODB Connected...');
    }).catch((error)=>{
        console.log('MONGODB Connection error',error);
    })