import { Schema, model } from 'mongoose';
import { mongooseToJSON } from '../utils';

interface IProperty {
    name: string;
}

const propertySchema = new Schema<IProperty>({
    name: { type: String, required: true },
});

propertySchema.set('toJSON', {
    versionKey: false,
    transform: mongooseToJSON()
});

export default model<IProperty>('Property', propertySchema);
