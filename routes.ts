/**
 * public route that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * these route will redirect logged user to /settings
 * @type {string[]}
 */
export const authRoutes=[
    "/auth/login",
]

/**
 * the prefix to API auth routes
 * use for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_ADMIN_REDIRECT = "/admin"
export const DEFAULT_PANITIA_REDIRECT = "/panitia"