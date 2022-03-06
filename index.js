import express from 'express'
import { connectDB } from './configs/mongodb.js';
import { env } from './configs/environment.js';


connectDB()
.then(()=> console.log('connected to db server'))
.then(()=> bootServer())
.catch(err => {
   console.log(err)
   process.emit()
})


const bootServer = ()=>{
   const app = express()
   app.listen(env.PORT,  ()=>{
      console.log(`server is running at port ${env.PORT}`)
   })
   app.get('/', (req, res)=>{
      res.send('hi ')
   })
}


