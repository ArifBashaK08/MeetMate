import { ReactNode } from "react"
import {Navbar,Sidebar} from "@/components"

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