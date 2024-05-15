import { User } from '../types/User';
import { UserRepository } from '../interfaces/User';
import { PostgreSQLClient } from '../db/PostgresClient';

export class PostgreSQLUserRepository implements UserRepository {
    private readonly db: PostgreSQLClient;

    constructor(db: PostgreSQLClient) {
        this.db = db;
    }

    async createUser(user: User): Promise<User> {
        const newUser = await this.db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [user.name, user.email]);
        return newUser.rows[0];
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.db.query('SELECT * FROM users WHERE email = $1', [id]);
        console.log('db', user);

        return user.rows[0];
    }
}
