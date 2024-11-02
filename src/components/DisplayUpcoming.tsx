"use client";
import Link from "next/link";
import { useGetCalls } from "@/hooks/useGetCalls";
import { displayFormatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

const DisplayUpcoming = () => {
    const { upcomingCalls } = useGetCalls();
    const [isLoading, setIsLoading] = useState(true);
    const upcomingMeetingTime = upcomingCalls?.[0]?.state?.startsAt || null;

    useEffect(() => {
        if (upcomingCalls !== undefined) {
            setIsLoading(false);
        }
    }, [upcomingCalls]);

    return (
        <Link href={"/upcoming"} className="glassmorphism px-2 py-1 rounded text-center text-base font-normal">
            {isLoading
                ? "Loading..."
                : upcomingCalls ?
                    `Upcoming Meeting @ ${displayFormatDate(upcomingMeetingTime)}`
                    : "No Upcoming calls"
            }
        </Link>
    );
};

export default DisplayUpcoming;
