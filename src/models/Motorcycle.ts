import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends Motorcycle, Document {}

const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  status: { type: String, required: false },
  category: String, 
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = createModel('Motorcycle', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;