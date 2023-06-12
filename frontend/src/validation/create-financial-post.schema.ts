import { object, string, number, mixed, InferType } from 'yup';
import { FinancialPostTypeEnum } from '../enum/financial-post-type.enum';

export const createFinancialPostSchema = object({
    description: string().min(3).required(),
    amount: number().required(),
    type: mixed<FinancialPostTypeEnum>().oneOf(Object.values(FinancialPostTypeEnum)).required(),
});

export type createFinancialPostType = InferType<typeof createFinancialPostSchema>;