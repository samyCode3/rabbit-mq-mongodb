import '../utils/dotConfig'
import "reflect-metadata"
import { DataSource } from "typeorm"


// import * as entity from '../entity'
export const AppDataSource = new DataSource({
    "type": "mongodb",
    "url": process.env.MONGODB_CONNECT,
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": true,
    "entities": ["src/entity/*.*"],
        })
   AppDataSource.initialize().then((db) => {
      if(db) {
        return console.log('Database is working and connected')
      }

   })



  