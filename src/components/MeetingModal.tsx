import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"


interface MeetingModalProps {
    className?: string,
    children?: string,
    image?: string,
    title: string,
    isOpen: boolean,
    handleClick?: () => void,
    onClose: () => void,
    buttonText?: string,
    buttonIcon?: string,
}

const MeetingModal = ({ className, title, isOpen, handleClick, onClose, buttonText, buttonIcon, image, children }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image
                                src={image}
                                alt="image"
                                width={72}
                                height={72} />
                        </div>
                    )}
                    <h1 className={cn("text-2xl font-bold leading-[42px]", className)}>{title}</h1>
                    {children}
                    <Button className="bg-blue-1 focus-visible:right-0 focus-visible:ring-offset-0"
                        onClick={handleClick}>
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt="image"
                                width={13}
                                height={13}
                            />
                        )}&nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}
export default MeetingModal