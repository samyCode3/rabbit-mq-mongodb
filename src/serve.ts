import * as express from "express";
import * as cors from "cors";
import * as config from "config";
import { AppDataSource } from "./connection/ormconfig";
import * as amqp from "amqplib/callback_api";
const PORT = config.get<number>("PORT");

export const rabbitConn = async(): Promise<void> => {
  await AppDataSource;
  amqp.connect(process.env.RABBIT_URI, (error0: any, connection: any) => {
    if (error0) throw error0;
    connection.createChannel((err: any, channel: any) => {
      if (err) throw err;
     channel.assertQueue("hello", { durable : false });
      const app = express();
      app.use(express.json());
      channel.consume("hello", (msg: any) => {
           console.log(msg.content.toString())
      });
      app.use(
        cors({
          origin: [
            "http://localhost:3000",
            "http://localhost:8080",
            "http://localhost:4200",
          ],
        })
      );
      
      app.listen(PORT, () => console.log(`App running on ${PORT}`));
     
    });
  });
};
rabbitConn()
