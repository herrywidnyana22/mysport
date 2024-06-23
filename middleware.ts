import authConfig from "./auth.config"
import NextAuth from "next-auth"

import { 
  DEFAULT_ADMIN_REDIRECT, 
  DEFAULT_PANITIA_REDIRECT,
  apiAuthPrefix, 
  authRoutes, 
  loggedRoute, 
  publicRoutes 
} from "./routes"
import { Role } from "@prisma/client"
import { currentRole } from "./lib/auth"
 
export const { auth } = NextAuth(authConfig)

export default auth((req) =>{
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const userRole = req.auth?.user?.role

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  const adminRoute = nextUrl.pathname.startsWith(DEFAULT_ADMIN_REDIRECT)
  const panitiaRoute = nextUrl.pathname.startsWith(DEFAULT_PANITIA_REDIRECT)

  const currentUserRole = req.auth?.user

  // console.log({currentUserRole})

  if(isApiAuthRoute) return

  if (isAuthRoute){
    if(isLoggedIn){
      if(userRole === Role.ADMIN){
        return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
      }
  
      if(userRole === Role.PANITIA){
        return Response.redirect(new URL(DEFAULT_PANITIA_REDIRECT, nextUrl))
      }
    }
    
    return
  }

  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  return 
}) 
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}