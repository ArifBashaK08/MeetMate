// @ts-nocheck

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { MeetingCard, Loader } from ".";
import { useToast } from "@/components/ui/use-toast";
import { displayFormatDate } from "@/lib/utils";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
    const { toast } = useToast()
    const router = useRouter()
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming': {
                const sortedUpcomingCalls = upcomingCalls?.sort((a, b) => a.state?.startsAt - b.state?.startsAt)
                return sortedUpcomingCalls;
            }
            default:
                return []
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings?.map((meeting) => meeting.queryRecordings()))

                const recordings = callData
                    .filter(call => call?.recordings?.length > 0)
                    .flatMap(call => call?.recordings)

                setRecordings(recordings)
            } catch (error) {
                toast({ title: "Try again later" })
                console.log(error);
            }
        }
        if (type === "recordings") fetchRecordings()
    }, [type, callRecordings, toast])


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

    if (isLoading) return <Loader />

    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ?
                calls.map((meeting: Call | CallRecording, index) => (
                    <MeetingCard
                        key={(meeting as Call).id || (meeting as CallRecording).url || index}
                        icon={
                            type === 'ended'
                                ? '/icons/previous.svg'
                                : type === 'upcoming'
                                    ? '/icons/upcoming.svg'
                                    : '/icons/recordings.svg'
                        }
                        title={
                            (meeting as Call).state?.custom?.description?.substring(0, 50) ||
                            (meeting as CallRecording).filename?.substring(0, 20) ||
                            'Personal Meeting'
                        }
                        date={
                            displayFormatDate(
                                (meeting as Call).state?.startsAt ||
                                (meeting as CallRecording).start_time
                            )
                        }
                        isPreviousMeeting={type === 'ended'}
                        link={
                            type === 'recordings'
                                ? (meeting as CallRecording).url
                                : `${window.location.origin}/meeting/${(meeting as Call).id}`
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