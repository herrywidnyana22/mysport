import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import {  getUserByID } from "./services/users/get"
 
 
export const { 
  handlers, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  callbacks:{
    // async signIn({user}) {
    //   const existUser = await getUserByID(user.id!)
    //   if(!existUser || !existUser.emailVerified){
    //     return false
    //   }
    //   return true
    // },

    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }

      if(token.role && session.user){
        session.user.role = token.role
      }

      return session
    },

    async jwt({token}) {
      if(!token.sub) return token

      const existUser = await getUserByID(token.sub)
      if(!existUser) return token

      token.role = existUser.data.role
      console.log({token})
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { 
    strategy: "jwt" 
  },
  ...authConfig,
})