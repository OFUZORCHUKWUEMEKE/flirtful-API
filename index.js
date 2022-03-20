const mongoose = require('mongoose')
const express = require('express')
const authroute = require('./router/auth')
const userroute = require('./router/user')
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

  
app.use('/auth',authroute)  
app.use('/user',userroute)

app.use((req,res,next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
 })
  
 app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.json({
       error:{
          message:err.message
       }
    })
 })

mongoose.connect(process.env.MONGO_URI,()=>console.log('connected to db'))


app.listen(port, ()=>console.log(`app running on port ${port}`))