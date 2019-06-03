import express, { Router,Request,Response} from 'express'
import * as path from 'path'
import * as pg from 'pg'
import pgpromise from 'pg-promise';
import * as TypeORM from 'typeorm';

import { any } from 'bluebird';
import User from './User';
export class App{

     public app: express.Application;
     public router: Router;
     public dbConnection!: TypeORM.Connection;
     constructor(){
           this.app = express();
            this.router= express.Router();

           this.configServer();
           this.configMiddlewares();
           this.configDB();
           this.configRoutes(); 
     }

     private configServer(){
         this.app.listen(3000,()=> {
              console.log("started!!");      
         });
     }

     private configRoutes(){

            this.app.get("/home/:name" , (req,res) => {
                res.send(`hello ${req.params.name}`);
            });

            this.app.get("/addUser",async(req,res)=>{
                const user = new User();
                user.firstname = "asdsad";
                user.lastname = "asdsad";        
                const userRepo = this.dbConnection.getRepository(User);
                await userRepo.save(user);
                

                res.send("added successfully");
             })

             this.app.get("/getUser",async(req,res) => {

                const userRepo = this.dbConnection.getRepository(User);
                const user = await userRepo.find();
                
                res.send(user);

             })

            // this.router.get("/", (req: Request, res: Response )=> {
            //     res.send("helooo!!");

            // }) ;   
     }

     private configMiddlewares(){
         this.app.set('views',path.join(__dirname, 'views'));
         this.app.set('view engine', 'ejs');
        //  this.app.use('body-parser');
     }

     private configDB(){

        TypeORM.createConnection({
            type: "postgres",
            port: 5432,
            username: "postgres",
            password: "abcd1234",
            database: "typescript_library",
            synchronize: true,
            logging: true,
            entities: [User]
        }).then(connection => {
            this.dbConnection = connection
        }).catch(error => {
            console.log(error);
        });
    }
     
}

export const application = new App();