import { ReactNode } from "react"
import StreamVideoProvider from "../../../providers/StreamClientProvider"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Verse: Our Virtual Collaboration Hub",
  description: "Let's connect and collaborate effortlessly with our seamless video meeting app!",
  icons:{
    icon: "/images/logo.png"
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}
export default RootLayout