/**
 * public route that do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
]

/**
 * these route will redirect logged user to /settings
 * @type {string[]}
 */
export const authRoutes=[
    "/auth/login",
    "/auth/error"
]

/**
 * the prefix to API auth routes
 * use for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after logging in for role admin
 * @type {string}
 */
export const DEFAULT_ADMIN_REDIRECT = "/admin"


/**
 * Default redirect path after logging in for role panitia
 * @type {string}
 */
export const DEFAULT_PANITIA_REDIRECT = "/panitia"