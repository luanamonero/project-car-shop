import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  status: { type: String, required: false },
  doorsQty: Number, 
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(public model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;