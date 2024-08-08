import { z } from "zod"

export const SignUpformSchema = z.object({
    name : z.string().min(2, {message:"Name is Too Short"}),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message:"Password Should Be 8 Characters."})
  })