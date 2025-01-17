import { z } from "zod"

export const SignUpformSchema = z.object({
    name : z.string().min(2, {message:"Name is Too Short"}),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message:"Password Should Be 8 Characters."})
  })

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message:"Password Should Be 8 Characters."})
  })  

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file:z.custom<File[]>(),
  location:z.string().min(2).max(12),
  tags:z.string()
})


export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
