"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { MeetingRoom, MeetingSetup } from "@/components"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useGetCallById } from "../../../../hooks/useGetCallById"
import Loader from "@/components/Loader"

const Meeting = ({ params: { id } }: { params: { id: string } }) => {

  const { isLoaded } = useUser()
  const [isSetupCompleted, setIsSetupCompleted] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>)
}
export default Meeting