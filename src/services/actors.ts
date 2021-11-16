import { Connection, EntityColumnNotFound, Repository } from "typeorm";
import { BaseService } from "./base";
import { Actor } from "../models/actors";

export class ActorService implements BaseService {

    connection: Connection;
    repository: Repository<Actor>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.repository = connection.getRepository(Actor);
    }

    async getAll(): Promise<Actor[]> {
        return await this.repository.find();
    }

    async getOne(id: number): Promise<Actor | undefined> {
        return await this.repository.findOne(id);
    }

    async create(entity: any): Promise<Actor | undefined> {
        let actor;

        if (entity.name && entity.bornYear && entity.country) {
            actor = new Actor();

            actor.name = entity.name;
            actor.bornYear = entity.bornYear;
            actor.country = entity.country;
    
            await this.repository.save(actor);
        }

        return actor;
    }

    async update(id: number, values: any): Promise<Actor | undefined> {
        const actor = await this.repository.findOne(id);

        if ((actor !== undefined) && (values !== {})) {
            if (values.name) actor.name = values.name;
            if (values.bornYear) actor.bornYear = values.bornYear;
            if (values.country) actor.country = values.country;

            await this.repository.save(actor);
        }

        return actor;
    }

    async delete(id: number): Promise<Actor | undefined> {
        const actor = await this.repository.findOne(id);

        if (actor !== undefined) {
            await this.repository.remove(actor);
        }

        return actor;
    }

}