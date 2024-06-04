'use client'

import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL!

const convex = new ConvexReactClient(convexURL)

export const ConvexClient = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConvexProvider client={convex}>
            {children}
        </ConvexProvider>
    )
}
