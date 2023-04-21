import { connect } from 'mongoose';
import getConfig from './config';
import getLogger from './logger';
import initServer from './server';

async function main() {
    const config = getConfig();
    const logger = getLogger(config.get('LOG_LEVEL'));

    await connect(config.get('MONGO_URI'));

    await initServer(logger, config);
}

main()
    .catch(err => console.log('Error during app init', err));
