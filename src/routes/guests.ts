import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler"
import Guest from '../models/guest';

const router = express.Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const guests = await Guest.find();
    res.json({
        status: 'ok',
        res: guests
    });
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const guest = new Guest({
        name: req.body.name,
        phone: req.body.phone
    });
    await guest.save();
    res.json({ status: 'ok' });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const guest = await Guest.findById(req.params.id);
    res.json({
        status: 'ok',
        res: guest
    });
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    await Guest.deleteOne({ _id: req.params.id });
    res.json({
        status: 'ok'
    });
}));

export default router;
