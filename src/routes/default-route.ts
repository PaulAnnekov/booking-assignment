import { Router, Request, Response } from 'express';

const route = Router();

route.get('/', (req: Request, res: Response) => {
    res.send("What's up doc ?!");
});

export default route;
