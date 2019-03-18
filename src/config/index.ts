import { ProcessEnv } from '../types';

const environment = process.env.NODE_ENV as ProcessEnv;

switch (environment) {
    case 'local':
        break;
    case 'development':
        break;
    case 'production':
        break;
}
