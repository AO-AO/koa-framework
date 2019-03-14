import { DB } from '../drivers/db';

export interface UserMetadata {
    userID: string;
    platform: string;
    phone?: string;
    avatar?: string;
}

export class User {
    private userInfo: UserMetadata;
    private dbClient: DB;

    constructor (userInfo: UserMetadata) {
        this.userInfo = userInfo;
        this.dbClient = new DB('User');
    }

    public async getUserInfo (userID: string) {
        return this.dbClient.scan();
    }

    public setUserInfo (userInfo: UserMetadata) {
        return this.dbClient.write(this.userInfo);
    }
}
