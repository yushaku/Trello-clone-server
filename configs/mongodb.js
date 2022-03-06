import { MongoClient } from "mongodb";
import { env } from './environment.js'

let dbInstance = null

export const connectDB = async()=>{
   const client = new MongoClient(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })

   await client.connect()
   //assign the client db to db instance
   dbInstance = client.db(env.DATABASE_NAME)

}

export const getDb = ()=>{
   if(!dbInstance) throw new Error('must connect to db first!!!')

   return dbInstance
}

// const listDatabase = async(client)=>{
//    const databases = await client.db().admin().listDatabases()
//    console.log(databases)
// }