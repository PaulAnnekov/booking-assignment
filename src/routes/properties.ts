import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler"
import Property from '../models/property';

const router = express.Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const properties = await Property.find();
    res.json({
        status: 'ok',
        res: properties
    });
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const property = new Property({
        name: req.body.name
    });
    await property.save();
    res.json({ status: 'ok' });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const property = await Property.findById(req.params.id);
    res.json({
        status: 'ok',
        res: property
    });
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    await Property.deleteOne({ _id: req.params.id });
    res.json({
        status: 'ok'
    });
}));

export default router;
