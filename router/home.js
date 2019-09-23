const express = require('express');
const route = express.Router();
route.use((req,res,next)=>{
    console.log('这里是拦截器');
    next();
})
route.post('/test',(req,res)=>{
    res.send('this is the home router');
})
module.exports = route;