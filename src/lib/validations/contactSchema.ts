import * as z from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long")
    .trim(),
  email: z.string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  sector: z.string()
    .min(1, "Please select a fleet sector"),
  details: z.string()
    .min(10, "Details must be at least 10 characters")
    .max(1000, "Details are too long")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
