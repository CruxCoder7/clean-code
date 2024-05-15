import { Pool } from 'pg';

export class PostgreSQLClient {
    private pool: Pool;

    constructor(connectionString: string) {
        this.pool = new Pool({ connectionString });
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.pool.connect((err, _client, release) => {
                if (err) {
                    reject();
                    return console.error('Error acquiring client', err.stack);
                }
                console.log('Connected to PostgreSQL');
                release();
                resolve('');
            });
        });
    }

    public query(text: string, values: any[] = []): Promise<any> {
        return this.pool.query(text, values);
    }

    public async close(): Promise<void> {
        await this.pool.end();
        console.log('PostgreSQL connection closed');
    }
}
