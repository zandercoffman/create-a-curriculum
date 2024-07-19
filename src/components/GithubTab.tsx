import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import Link from "next/link";

export default function GithubTab() {
    return <>
        <Dialog>
            <DialogTrigger><Github /></DialogTrigger>
            <DialogContent className="!w-screen h-[60vh] !rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Github</DialogTitle>
                    <DialogDescription>
                        You can check out most of my coding projects on my GitHub. I am a solo developer aiming to better the future of tommorow. If you ever need to catch me, email <Link href={"mailto:zandercoffman34@gmail.com"} className="text-blue-600 font-bold">zandercoffman34@gmail.com</Link>.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-1">
                    <div className="flex flex-col gap-1 h-full w-1/2">
                        <div className="w-full h-min flex flex-col items-start justify-start">
                            <div className="flex flex-col gap-1 h-full w-full">
                                <Image src={"/profilepic.jpg"} width={90} height={90} className="rounded-full" />
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    Zander Coffman
                                </h3>
                                <h4 className="scroll-m-20 text-l text-gray-800 font-semibold tracking-tight">
                                    @zandercoffman - he/him
                                </h4>
                            </div>

                        </div>
                        <DialogHeader>
                            <DialogTitle><Button asChild><Link href={"https://github.com/zandercoffman"} className="flex flex-row gap-2"><ExternalLink />Link Here</Link></Button></DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="flex flex-col gap-1 h-full w-1/2">
                        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
                            Some of my achivements include:
                        </h4>
                        <ul className="!list-disc pl-6 space-y-2 text-gray-800">
                            <li>Getting a 4 on the AP Computer Science</li>
                            <li>Becoming certified in Java. <Link href={"https://www.credly.com/badges/aa15effd-3d7e-4ea8-a109-0c410424489e/public_url"} className="text-blue-500 font-bold">Certification Link</Link></li>
                            <li>Creating an app to help students learn Java: <Link href={"https://java-brewed.vercel.app/"} className="text-blue-500 font-bold">Link</Link></li>
                        </ul>
                    </div>
                </div>
            </DialogContent>

        </Dialog>

    </>
}