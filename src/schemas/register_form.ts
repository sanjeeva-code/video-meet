import { z } from 'zod';

export const registerFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  number: z
    .string()
    .min(10, { message: 'Phone number is required' })
    .regex(/^\+\d{10,14}$/, {
      message: "Invalid phone number format (example: '+91XXXXXXXXXX')"
    }),
  location: z.string().min(1, { message: 'Location is required' }),
  message: z.string().min(1, { message: 'Message is required' })
});
export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email({ message: 'Please enter a valid email address' })
});
