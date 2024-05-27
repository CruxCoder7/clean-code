import { urlencoded } from 'body-parser';
import express, { Request, Response } from 'express';
import { MongoDBClient } from './db/MongoClient';
import { MongoDBUserRepository } from './repositories/MongoUserRepo';
import { UserRepository } from './interfaces/User';
import { UserService } from './services/User';
import { UserController } from './controllers/User';
import { config } from 'dotenv';
import { PostgreSQLClient } from './db/PostgresClient';
import { PostgreSQLUserRepository } from './repositories/PostgresUserRepo';
config();

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

if(process.env.MONGO){
    const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI!);
    mongoDBClient.connect().then(() => {
        const mongoDBUserRepository = new MongoDBUserRepository(mongoDBClient);
        setupApp(mongoDBUserRepository);
    });
} else {
    const postgreSQLClient = new PostgreSQLClient(process.env.POSTGRES_URI!);
    postgreSQLClient.connect().then(() => {
        const postgreSQLUserRepository = new PostgreSQLUserRepository(postgreSQLClient);
        setupApp(postgreSQLUserRepository);
    });
}

function setupApp(userRepository: UserRepository) {
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.use(express.json());

    app.post('/users', (req: Request, res: Response) => userController.createUser(req, res));
    app.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));

    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
}
