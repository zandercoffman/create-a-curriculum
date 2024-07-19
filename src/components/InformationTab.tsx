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

export default function InformationTab() {
    return <>
        <Dialog>
            <DialogTrigger><Info /></DialogTrigger>
            <DialogContent className="w-[90vw] lg:w-[70vw] h-[70vh] !rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Welcome to Create A Curriculum!</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </>
}