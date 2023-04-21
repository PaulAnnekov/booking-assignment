import express, { Request, Response } from 'express';
import asyncHandler from "express-async-handler"
import Message from '../models/message';

enum From {
    Guest = "guest",
    Property = "property",
}

const router = express.Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
    const guestId = req.query.guestId as string;
    let query: any = {};
    if (guestId) {
        query = {
            $or: [
                { senderType: 'Guest', sender: guestId },
                { receiverType: 'Guest', receiver: guestId }
            ]
        }
    }
    const messages = await Message.find(query);
    res.json({
        status: 'ok',
        res: messages
    });
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
    const from: From = req.body.from;
    let senderType = from === From.Guest ? 'Guest' : 'Property';
    let receiverType = from === From.Guest ? 'Property' : 'Guest';
    const message = new Message({
        senderType,
        sender: req.body.senderId,
        receiverType,
        receiver: req.body.receiverId,
        text: req.body.text
    });
    await message.save();
    res.json({ status: 'ok' });
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const message = await Message.findById(req.params.id);
    res.json({
        status: 'ok',
        res: message
    });
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    await Message.deleteOne({ _id: req.params.id });
    res.json({
        status: 'ok'
    });
}));

export default router;
