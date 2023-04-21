import bunyan from 'bunyan';

export default function getLogger(level: bunyan.LogLevel) {
    const logger = bunyan.createLogger({
        name: 'booking',
        level
    });

    return logger;
}
