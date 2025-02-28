'use client'
import { useRouter } from 'next/router';

export function UserAuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    // Assume you have an `isAuthenticated` variable that checks if the user is logged in
    // if (!isAuthenticated) {
    //     // Store the current location in the state or a query parameter
    //     router.push(`/login?redirect=${encodeURIComponent(router.pathname)}`);
    //     return null; // Prevent rendering the protected page
    // }

    return <>{children}</>;
}