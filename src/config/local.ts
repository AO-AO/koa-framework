import { Config } from './base';

export class LocalConfig extends Config {
    constructor () {
        super();
        this.logLevel = 'debug';
    }
}
