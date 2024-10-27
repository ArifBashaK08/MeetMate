//@ts-nocheck

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import {MeetingCard, Loader} from "./";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {

    const router = useRouter()
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return []
        }
    }

    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No Previous calls";
            case 'recordings':
                return "No Recordings Availble";
            case 'upcoming':
                return "No Upcoming Call";
            default:
                return []
        }
    }

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()

    if(isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ?
                calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                    ? '/icons/upcoming.svg'
                                    : '/icons/recordings.svg'
                        }
                        title={
                            (meeting as Call).state?.custom?.description ||
                            (meeting as CallRecording).filename?.substring(0, 20) ||
                            'No Description'
                        }
                        date={
                            (meeting as Call).state?.startsAt?.toLocaleString() ||
                            (meeting as CallRecording).start_time?.toLocaleString()
                        }
                        isPreviousMeeting={type === 'ended'}
                        link={
                            type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                        }
                        buttonIcon1={type === 'recordings' && '/icons/play.svg'}
                        buttonText={type === 'recordings' ? 'Play' : 'Join'}
                        handleClick={type === "recordings" ? () => router.push(`${meeting.url}`) :
                            () => router.push(`/meeting/${meeting.id}`)
                        }
                    />
                )) : (
                    <h1 className="text-2xl font-bold">
                        {noCallsMessage}
                    </h1>
                )}

        </div>
    )
}
export default CallList