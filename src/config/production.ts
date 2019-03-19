import { Config } from './base';

export class ProductionConfig extends Config {
    constructor () {
        super();
        this.logLevel = 'info';
    }
}
