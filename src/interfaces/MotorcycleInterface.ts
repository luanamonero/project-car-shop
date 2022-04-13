import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500).int(),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;
