"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

interface HomeCardProps {
    className?: string;
    title: string;
    img: string;
    desc: string;
    handleClick: () => void

}

const HomeCard = ({ className, title, img, desc, handleClick }: HomeCardProps) => {
    return (
        <div className={cn("home-card", className)} onClick={handleClick}>
            <div className="flex-center glassmorphism size-12 rounded-lg">
                <Image src={img}
                    alt="Add" width={27} height={27} />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    {title}
                </h1>
                <p className="font-normal">
                    {desc}
                </p>
            </div>
        </div>
    )
}
export default HomeCard