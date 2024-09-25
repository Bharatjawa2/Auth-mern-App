const ensureAuthenticated = require('../Middlewares/Auth');

const router=require('express').Router()

router.get('/',ensureAuthenticated,(req,res)=>{
    // console.log("------logges in user details------", req.user);
    res.status(200).json([
        {
            name:'Mobile',
            price:1000000,
        },
        {
            name:'laptop',
            price:356099,
        }
    ])
})

module.exports=router;