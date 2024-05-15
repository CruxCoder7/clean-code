import { MongoClient, Db } from 'mongodb';

export class MongoDBClient {
    private client: MongoClient;
    private db: Db;

    constructor(uri: string) {
        this.client = new MongoClient(uri);
        this.db = this.client.db();
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

    public getDB(): Db {
        return this.db;
    }

    public async close(): Promise<void> {
        await this.client.close();
        console.log('MongoDB connection closed');
    }
}
