import { object, string, InferType } from 'yup';

export const loginSchema = object({
    email: string().email().required(),
    password: string().min(3).required(),
    lara: string().min(3).required()
});

export type LoginType = InferType<typeof loginSchema>;