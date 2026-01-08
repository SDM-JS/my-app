import z from "zod";

export const validSchema = z.object({
    fullName: z.string({ error: "Full name is required" }).min(6, { error: "Full name must be at least 6 characters" }),
    email: z.email({ error: "Email is required" }),
    phoneNumber: z.string({ error: "Phone number is required" }).min(9, 'Phone number must be valid'),
})

export const sourceSchema = z.object({
    name: z.string({ error: "Source name is required!" })
})