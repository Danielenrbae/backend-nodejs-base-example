import express , { Application } from 'express';
import morgan from "morgan";
import IndexRoutes from "./routes/index.routes";
import UserRoutes from "./routes/user.routes";

export class App {

    private app: Application;

    constructor(private port? : string | number){
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
        
    }

    async listen() {
      await this.app.listen(this.app.get('port'));
      console.log('Server on port ' , this.app.get('port'));
    }

    settings(){
        this.app.set('port' , this.port || 3000 || process.env.PORT);
    }

    middleware(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/user',UserRoutes);
    }

}