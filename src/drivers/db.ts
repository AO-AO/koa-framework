import * as fs from 'fs';
const dbPath = `${__dirname}/`;

export class DB {
    private tableName: string;
    private path: string;
    constructor (tableName: string) {
        this.tableName = tableName;
        this.path = `${dbPath}/${this.tableName}`;
    }
    public async write (data: object) {
        return fs.writeFileSync(this.path, data);
    }
    public async scan () {
        return fs.readFileSync(this.path);
    }
}
