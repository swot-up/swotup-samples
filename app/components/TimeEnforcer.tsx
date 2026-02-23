'use client';

import { useEffect, useState } from 'react';

interface TimeEnforcerProps {
    children: React.ReactNode;
    startDate: string;
    expiryInDays: number;
}

export function TimeEnforcer({ children, startDate, expiryInDays }: TimeEnforcerProps) {
    const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const start = new Date(startDate).getTime();
        const expiry = start + expiryInDays * 24 * 60 * 60 * 1000;
        const now = new Date().getTime();

        if (now > expiry) {
            window.location.href = 'https://swot-up.com';
        } else {
            setIsAllowed(true);
        }
    }, [startDate, expiryInDays]);

    if (isAllowed === null) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium tracking-widest text-sm uppercase">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
}
