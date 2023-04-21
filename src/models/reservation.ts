import { Schema, model } from 'mongoose';
import { mongooseToJSON } from '../utils';

interface IReservation {
    startDate: Date;
    endDate: Date;
    guest: Schema.Types.ObjectId;
    property: Schema.Types.ObjectId;
}

const reservationSchema = new Schema<IReservation>({
    startDate: {
        type: Date, required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
        index: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
        index: true
    },
});

reservationSchema.set('toJSON', {
    versionKey: false,
    transform: mongooseToJSON()
});

export default model<IReservation>('Reservation', reservationSchema);
