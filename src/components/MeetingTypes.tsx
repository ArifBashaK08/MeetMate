"use client"
import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import { MeetingModal } from "."
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/hooks/use-toast"

const MeetingTypes = () => {

    const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>()

    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    })

    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()

    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({
                    title: "Please, select Date and Time"
                })
                return;
            }
            const id = crypto.randomUUID()
            const call = client.call("default", id)

            if (!call) throw new Error("Failed to initiate meeting")

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
            const description = values.description || "Quick connect"
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created!"
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to create meeting!"
            })
        }
    }

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                className="bg-orange-1"
                title="New Meeting"
                img="/icons/add-meeting.svg"
                desc="Connect seemlessly with instant meeting"
                handleClick={() => setMeetingState("isInstantMeeting")}
            />
            <HomeCard
                className="bg-blue-1"
                title="Schedule Meeting"
                img="/icons/schedule.svg"
                desc="Plan to connect with your colleagues"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <HomeCard
                className="bg-purple-1"
                title="View Recordings"
                img="/icons/recordings.svg"
                desc="Revist the moments with our recordings"
                handleClick={() => router.push("/recordings")}
            />
            <HomeCard
                className="bg-yellow-1"
                title="Join Meeting"
                img="/icons/join-meeting.svg"
                desc="Join meeting with invitation link"
                handleClick={() => setMeetingState("isJoiningMeeting")}
            />

            <MeetingModal className="text-center"
                title="Start an Instant Meeting"
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                buttonText="Create Meeting"
                handleClick={createMeeting}
            />

        </section>
    )
}
export default MeetingTypes