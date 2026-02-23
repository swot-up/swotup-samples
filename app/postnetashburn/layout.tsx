import { TimeEnforcer } from "../components/TimeEnforcer";
import { clientConfig } from "./config";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PostNet Ashburn Sample",
    description: "Interactive prototype for PostNet Ashburn business center.",
};

export default function PostnetLayout({ children }: { children: React.ReactNode }) {
    return (
        <TimeEnforcer startDate={clientConfig.startDate} expiryInDays={clientConfig.expiryInDays}>
            <div className="selection:bg-red-500/30 font-sans">
                {children}
            </div>
        </TimeEnforcer>
    );
}
