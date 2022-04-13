import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

class Service<T> {
  constructor(public model: Model<T>) {}

  public create = async (obj: T): 
  Promise<T | null | ServiceError> => this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: string)
  : Promise<T | null | ServiceError> => this.model.readOne(id);

  public update = async (id: string, obj: T): 
  Promise<T | null | ServiceError> => this.model.update(id, obj);

  delete = async (id: string): 
  Promise<T | null | ServiceError> => this.model.delete(id);
}

export default Service;
