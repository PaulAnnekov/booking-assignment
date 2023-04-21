import nconf from 'nconf';
import bunyan from 'bunyan';

export default function getConfig() {
    const config = new nconf.Provider();
    config.env();

    config.file(`${process.env.NODE_ENV}.json`);

    config.defaults({
        PORT: 3000,
        LOG_LEVEL: bunyan.INFO
    });

    config.required([
        'PORT',
        'LOG_LEVEL',
        'MONGO_URI'
    ]);

    return config;
}
