import { z } from "zod";
export const OnboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters *"),
  lastName: z.string().min(2, "Last name must be at least 2 characters *"),
  address: z.string().min(2, "Address must be at least 2 characters *"),
});
