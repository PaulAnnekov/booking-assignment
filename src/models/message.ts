import { Schema, model } from 'mongoose';
import { mongooseToJSON } from '../utils';

interface IMessage {
    senderType: string;
    sender: Schema.Types.ObjectId;
    receiverType: string;
    receiver: Schema.Types.ObjectId;
    text: string;
}

const messageSchema = new Schema<IMessage>({
    senderType: {
        type: String,
        enum: ['Guest', 'Property'],
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        refPath: 'senderType',
        required: true
    },
    receiverType: {
        type: String,
        enum: ['Guest', 'Property'],
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        refPath: 'receiverType',
        required: true
    },
    text: {
        type: String,
        required: true
    },
});

// TODO: need to re-check whether these indexes are enough to support the query in API
messageSchema.index({ senderType: 1, sender: 1 });
messageSchema.index({ receiverType: 1, receiver: 1 });

messageSchema.set('toJSON', {
    versionKey: false,
    transform: mongooseToJSON()
});

export default model<IMessage>('Message', messageSchema);
