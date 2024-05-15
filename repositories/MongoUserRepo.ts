import { Db, ObjectId } from "mongodb";
import { UserRepository } from "../interfaces/User";
import { User } from "../types/User";
import { MongoDBClient } from "../db/MongoClient";

export class MongoDBUserRepository implements UserRepository {
    private readonly db: Db;

    constructor(db: MongoDBClient) {
        this.db = db.getDB();
    }

    async createUser(user: User): Promise<User> {
        const newUser = await this.db.collection('users').insertOne(user);
        return newUser as unknown as User;
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.db.collection('users').findOne({
            _id: new ObjectId(id)
        });
        console.log('db', user);
        return user as unknown as User;
    }
}
