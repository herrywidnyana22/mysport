import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import {  getUserByID } from "./services/users/get"
import { Role } from "@prisma/client"
 
 
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

      if(token.username && session.user){
        session.user.username = token.username
      }

      if(token.role && session.user){
        session.user.role = token.role as Role
      }

      // console.log({userSession: session})

      return session
    },

    async jwt({token}) {
      if(!token.sub) return token

      const existUser = await getUserByID(token.sub)
      if(!existUser) return token

      token.username = existUser.data.username
      token.role = existUser.data.role
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { 
    strategy: "jwt" 
  },
  ...authConfig,
})