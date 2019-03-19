import { ProcessEnv } from '../types';
import { Config } from './base';
import { LocalConfig } from './local';
import { DevelopmentConfig } from './development';
import { ProductionConfig } from './production';

const environment = process.env.NODE_ENV as ProcessEnv;

let config: Config;
switch (environment) {
    case 'local':
        config = new LocalConfig();
        break;
    case 'development':
        config = new DevelopmentConfig();
        break;
    case 'production':
        config = new ProductionConfig();
        break;
}
export { config };
