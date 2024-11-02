"use client"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useGetCallById } from "../../../../../hooks/useGetCallById"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Table = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="flex items-start flex-col xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{title} :</h1>
      <h1 className="text-sm font-bold lg:text-xl max-sm:max-w-[320px] truncate">{description}</h1>
    </div>
  )
}

const MeetingRoom = () => {

  const { toast } = useToast()
  const { user } = useUser()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { call } = useGetCallById(meetingId!)
  const client = useStreamVideoClient()
  const router = useRouter()

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-3xl font-bold">Personal Meeting Room</h1>
      <div className="flex w-full flex-col xl:max-w-[]900px gap-2">
        <Table title={"Topic"} description={`${user?.username}'s meeting room`} />
        <Table title={"Meeting ID"} description={`${meetingId!}'s meeting room`} />
        <Table title={"Invite Link"} description={`${meetingLink}'s meeting room`} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className="bg-dark-3 flex items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({ title: "Link Copied!" })
          }}>
            <Image src={"/icons/copy.svg"}
                alt="copy"
                width={20}
                height={20}
                priority
            />
          Copy Link
        </Button>
      </div>
    </section>)
}
export default MeetingRoom