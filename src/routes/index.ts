import express from 'express';
import defaultRoute from './default-route';
import guests from './guests';
import messages from './messages';
import properties from './properties';
import reservations from './reservations';

const routes = express.Router();
routes.use(defaultRoute);
routes.use('/guests', guests);
routes.use('/messages', messages);
routes.use('/properties', properties);
routes.use('/reservations', reservations);

export default routes;
