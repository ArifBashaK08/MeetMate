// @ts-nocheck
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MeetingModal, HomeCard, Loader } from "."
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "@/components/ui/use-toast"
import ReactDatePicker from "react-datepicker"

const MeetingTypes = () => {

    const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>(undefined)

    const router = useRouter()
    const { user } = useUser()
    const { toast } = useToast()
    const client = useStreamVideoClient()

    const [callDetails, setCallDetails] = useState<Call>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: ""
    })


    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({ title: 'Please select a date and time' });
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create meeting');
            const startsAt =
                values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({
                title: 'Meeting Created',
            });
        } catch (error) {
            console.error(error);
            toast({ title: 'Failed to create Meeting' });
        }
    };

    if (!client || !user) return <Loader />;

    const meetingLink = `${window.location.origin}/meeting/${callDetails?.id}`

    const homeCardProps = [
        {
            className: "bg-orange-1",
            title: "New Meeting",
            img: "/icons/add-meeting.svg",
            desc: "Connect seemlessly with instant meeting",
            handleClick: () => setMeetingState("isInstantMeeting")
        },
        {
            className: "bg-blue-1",
            title: "Schedul Meeting",
            img: "/icons/schedule.svg",
            desc: "Plan to connect with your colleagues",
            handleClick: () => setMeetingState("isScheduleMeeting")
        },
        {
            className: "bg-purple-1",
            title: "View Recordings",
            img: "/icons/recordings.svg",
            desc: "Revist the moments with our recordings",
            handleClick: () => router.push("/recordings")
        },
        {
            className: "bg-yellow-1",
            title: "Join Meeting",
            img: "/icons/join-meeting.svg",
            desc: "Join meeting with invitation link",
            handleClick: () => setMeetingState("isJoiningMeeting")
        },
    ]

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeCardProps.map(({ className, title, img, desc, handleClick }, index) => (
                <HomeCard key={index}
                    className={className}
                    title={title}
                    img={img}
                    desc={desc}
                    handleClick={handleClick}
                />
            ))
            }
            {!callDetails ? (
                <MeetingModal
                    title="Create Meeting"
                    isOpen={meetingState === "isScheduleMeeting"}
                    handleClick={createMeeting}
                    onClose={() => setMeetingState(undefined)}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                        </label>
                        <textarea rows={2}
                            className="input-class min-h-4"
                            onChange={(e) =>
                                setValues({ ...values, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal className="text-center"
                    title="Meeting Created"
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: "Copied" })
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Link"
                />
            )}
            <MeetingModal className="text-center"
                title="Start an Instant Meeting"
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                buttonText="Create Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal className="text-center"
                title="Type your link here..."
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                buttonText={"Join Meeting"}
                handleClick={() => router.push(values.link)}
            >
                <input 
                placeholder="Meeting link..."
                className="input-class" 
                onChange={(e) => setValues({...values, link: e.target.value})}
                />
            </MeetingModal>
        </section>
    )
}
export default MeetingTypes