import { Info } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area";

export default function PrivacyPopup() {
    return <>
        <Dialog>
            <DialogTrigger className="font-bold text-blue-500">privacy overview</DialogTrigger>
            <DialogContent className="!w-[90vw] h-[60vh] !rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Privacy Overview</DialogTitle>
                    <DialogDescription>
                        Privacy? That{"'"}s our motto. In making this application, AI has always been a prominant key to deliver access to the community. In developing, there are rules I am following to ensure every user{"'"}s security.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="w-full h-full">
                    <div className="flex flex-col gap-8 w-full justify-start mb-auto h-full pr-2">
                        <Rule title="You are in control of your data." 
                        desc="Decide whether to let the AI see the grade of the applicant and choose if and how your information is saved, ensuring it aligns with your preferences." index={1} />
                        <Rule title="Your information remains private and secure." 
                        desc="The AI is provided solely with your product name, description, and number of lessons. Your personal information is managed separately, ensuring that models do not use it for training purposes." index={2} />
                        <Rule title="Your information is not defaultly stored." 
                        desc="Any details you provide are used solely for the current session and are not saved afterward. Features like history and storing information are managed by you, ensuring your data remains transient and unarchived." index={3} />
                        <Rule title="title" desc="desc" index={3} />
                        <Rule title="title" desc="desc" index={3} />
                        <Rule title="title" desc="desc" index={3} />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    </>
}

function Rule({ title, desc, index }) {
    return (
        <div className="flex flex-row h-fit gap-2 items-center">

            <div
                className="w-12 h-12 flex-shrink-0 bg-gray-500 flex items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ width: '3rem', height: '3rem' }} // Adjust the size here
            >
                {index}
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="text-xl font-semibold tracking-tight">
                    {title}
                </h4>
                <p className="leading-4 mt-1">
                    {desc}
                </p>
            </div>

        </div>
    );
}

