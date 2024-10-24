import { ReactNode } from "react"
import {Navbar,Sidebar} from "@/components"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Verse: Our Virtual Collaboration Hub",
  description: "Let's connect and collaborate effortlessly with our seamless video meeting app!",
  icons:{
    icon: "/images/logo.png"
  }
};
const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <section className="min-h-screen flex-1 flex-col px-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default HomeLayout