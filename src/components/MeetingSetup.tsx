"use client"

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const MeetingSetup = ({ setIsSetupCompleted }: { setIsSetupCompleted: (value: boolean) => void }) => {

  const [isMicCamToggled, setIsMicCamToggled] = useState(false)

  const call = useCall()

  if (!call) {
    throw new Error("useCall must be used within StreamCall complonent")
  }

  useEffect(() => {
    if (!isMicCamToggled) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggled, call?.camera, call?.microphone])


  return (
    <div className="flex-center h-screen w-full gap-3 flex-col">
      <h1 className="text-2xl font-bold">
        Meeting Setup
      </h1>
      <VideoPreview />
      <div className="flex-center h-16 gap-3">
        <label className="flex-center gp-2">
          <input type="checkbox"
            name="" id=""
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Turn on Mic and Camera
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join()
          setIsSetupCompleted(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}
export default MeetingSetup