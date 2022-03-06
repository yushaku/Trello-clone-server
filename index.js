import express from 'express'
import { connectDB } from './configs/mongodb.js';
import { env } from './configs/environment.js';
import {apiV1} from './routers/v1/index.js'

connectDB()
.then(()=> console.log('connected to db server'))
.then(()=> bootServer())
.catch(err => {
   console.log(err)
   process.emit()
})


const bootServer = ()=>{
   const app = express()

   //enable request body data
   app.use(express.json())
   
   app.listen(env.PORT,  ()=>{
      console.log(`server is running at port ${env.PORT}`)
   })
   app.use('/v1', apiV1)
}


