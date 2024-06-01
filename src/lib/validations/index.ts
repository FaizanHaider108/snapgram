import * as z from "zod"
// Signup form schema and validations
export const SignupFormSchema = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2, {message: "Too Short"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 charactors"}),
});
// Signup form schema and validations
export const SigninFormSchema = z.object({
     email: z.string().email(),
    password: z.string().min(8, {message: "Password must be atleast 8 charactors"}),
});
// Signup form schema and validations
export const PostValidations = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string()
});

export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });