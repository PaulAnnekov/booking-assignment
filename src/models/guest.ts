import { Schema, model } from 'mongoose';
import { mongooseToJSON } from '../utils';

interface IGuest {
    name: string;
    phone: string;
}

const guestSchema = new Schema<IGuest>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
});

guestSchema.set('toJSON', {
    versionKey: false,
    transform: mongooseToJSON()
});

export default model<IGuest>('Guest', guestSchema);
