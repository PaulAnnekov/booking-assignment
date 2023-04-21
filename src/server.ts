import express, { Express, Request, Response } from 'express';
import Logger from 'bunyan';
import { Provider } from 'nconf';
import routes from './routes';

export default async (logger: Logger, config: Provider) => {
    const app: Express = express();
    const port = config.get('PORT');

    app.use(express.json());

    app.use('/', routes);

    app.use(function errorHandler(err: Error, req: Request, res: Response, next: any) {
        res.status(500);
        res.json({
            status: 'error',
            res: 'Internal server error. We are working on it. Try to repeat the request.'
        });
        logger.error(err, 'Error during request');
    });

    app.listen(port, () => {
        logger.info({ port }, 'Server is running');
    });
}
