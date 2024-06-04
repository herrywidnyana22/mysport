import { v } from "convex/values"
import { action, mutation, query } from "./_generated/server"
import { getAllOrThrow } from "convex-helpers/server/relationships"
import bcrypt from "bcryptjs"
import { RegisterpSchema } from "@/lib/formSchema"
import { z } from "zod"

export const createUser = mutation({
  // args: {
  //   formData: RegisterpSchema
  // },
  handler: async (ctx, arg) => {
    const validateValues = RegisterpSchema.safeParse(arg.formData);

    if (!validateValues.success) {
      return {
        error: "Invalid fields...!",
      };
    }

    const { name, email, password, username } = validateValues.data;

    // const hashedPassword = await bcrypt.genSalt(10);

    const create = await ctx.db.insert("users", {
        name,
        username,
        email,
        role: "ADMIN",
        password
    });

    return create;
  },
})