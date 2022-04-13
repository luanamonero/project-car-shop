import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({
    invalid_type_error: 'Model must be a string',
    required_error: 'Model is required',
  }).min(3, { message: 'Model must be 3 or more characteres long' }),
  year: z.number().min(1900).max(2022),
  color: z.string({
    invalid_type_error: 'Color must be a string',
    required_error: 'Color is required',
  }).min(3, { message: 'Color must be 3 or more characteres long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
