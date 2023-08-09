const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')

dotenv.config()
const port=3000

const routeToIndex=require('./routes/index')
app.use(express.json())
app.use(express.static('public'))

app.use(cors())
app.use('/', routeToIndex)

try{
    mongoose.connect(`${process.env.URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
}
catch(error){
    console.log(error)
}

app.listen(port, ()=>{
    console.log(`Listening on: http://localhost:${port}/`)
})