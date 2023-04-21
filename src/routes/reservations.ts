import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler"
import Reservation from '../models/reservation';

const router = express.Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const propertyId = req.query.propertyId as string;
    const guestId = req.query.guestId as string;
    const query: { property?: string, guest?: string } = {};
    if (propertyId) {
        query.property = propertyId;
    }
    if (guestId) {
        query.guest = guestId;
    }
    const reservations = await Reservation.find(query);
    res.json({
        status: 'ok',
        res: reservations
    });
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const reservation = new Reservation({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        guest: req.body.guestId,
        property: req.body.propertyId
    });
    await reservation.save();
    res.json({ status: 'ok' });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const reservation = await Reservation.findById(req.params.id);
    res.json({
        status: 'ok',
        res: reservation
    });
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    await Reservation.deleteOne({ _id: req.params.id });
    res.json({
        status: 'ok'
    });
}));

export default router;
