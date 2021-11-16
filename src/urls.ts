import { Express } from "express";
import { Connection } from "typeorm";
import { ActorService } from "./services/actors";
import { ActorRoutes } from "./routes/actors";

export default function makeRoutes(app: Express, conn: Connection) {

    ActorRoutes.service = new ActorService(conn);

    app.get('/actors', ActorRoutes.getAll);
    app.post('/actors', ActorRoutes.create);
    app.get('/actors/:id', ActorRoutes.getOne);
    app.put('/actors/:id', ActorRoutes.update);
    app.delete('/actors/:id', ActorRoutes.delete);
    
}