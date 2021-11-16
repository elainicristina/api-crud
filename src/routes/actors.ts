import { ActorService } from "../services/actors";
import { Request, Response } from "express";
import { ModelBaseRoute } from "./base";

export class ActorRoutes extends ModelBaseRoute {

    static service: ActorService;

    static async getAll(req: Request, res: Response, next: Function): Promise<void> {
        try {
            res.status(200);
            res.json(await ActorRoutes.service.getAll());
        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Erro interno no servidor'});
        }
    }

    static async getOne(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const actor = await ActorRoutes.service.getOne(id);

            if (actor !== undefined) {
                res.status(200);
                res.json(await ActorRoutes.service.getOne(id));
            }
            else {
                res.status(404);
                res.json({message: 'Actor not found'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Erro interno no servidor'})
        }        
    }

    static async create(req: Request, res: Response, next: Function): Promise<void> {
        try {

            const requestBody = req.body;
            const actor = await ActorRoutes.service.create(requestBody); 

            if (actor !== undefined) {
                res.status(201);
                res.json(actor);
            }
            else {
                res.status(422);
                res.json({message: 'Wrong fields. Please, review your request!'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Erro interno no servidor'});
        }        
    }

    static async update(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const newFields = req.body;

            const actor = await ActorRoutes.service.update(id, newFields);

            if (actor !== undefined) {
                res.status(200);
                res.json(actor);
            }
            else {
                res.status(404);
                res.json({message: 'Actor not found'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Erro interno no servidor'});
        }        
    }

    static async delete(req: Request, res: Response, next: Function): Promise<void> {
        try {
            const id = Number(req.params.id);
            const actor = await ActorRoutes.service.delete(id);

            if (actor !== undefined) {
                res.status(200);
                res.json(actor);
            }
            else {
                res.status(404);
                res.json({message: 'Actor not found'});
            }

        }
        catch (error) {
            console.log(error);

            res.status(500);
            res.json({message: 'Erro interno no servidor'});
        }        
    }
}