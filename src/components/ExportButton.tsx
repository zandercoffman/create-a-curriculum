"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ArrowRightFromLine } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Text, ClipboardCopy } from "lucide-react";
import { SVGProps, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MessageSelector from "./MessageSelector"

interface BigButtonProps {
    text: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    callback?: () => void; // Optional callback function
}

interface Props {
    messages: any;
    buttonRef: any;
}

export default function ExportButton(props: Props) {

    const [curId, setCurId] = useState<string | null>(null);

    const handleExportPDF = () => {
        console.log("Export to PDF clicked");
        // Add PDF export logic here
    };

    const handleExportText = () => {
        console.log("Export to Text clicked");
        // Add Text export logic here
    };

    const handleCopy = () => {
        console.log("Copy clicked");
        // Add Copy logic here
    };

    return <>
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <Button className="transform rotate-180" ref={props.buttonRef}>
                    <div className="flex flex-row gap-2 items-center w-fit overflow-hidden">
                        <div className="w-6 h-6 flex-shrink-0 transform rotate-180">
                            <ArrowRightFromLine className="w-full h-full" />
                        </div>

                        <h1 className="flex-1 transform rotate-180">Export as..</h1>

                    </div>
                </Button>
            </SheetTrigger>
            <div className="hidden lg:block normal-case">
                <Button asChild>
                    <Link href="https://create-a-curriculum.vercel.app/">https://create-a-curriculum.vercel.app/</Link>
                </Button>
            </div>
            <SheetContent className="normal-case rounded-l-3xl">
                <SheetHeader className="h-[15%]">
                    <SheetTitle className="justify-center lg:justify-end w-full flex">Export</SheetTitle>
                    <SheetDescription className="lg:text-right text-center w-full flex">
                        Check to see your outputted curriculum. Feel free to edit parts you would like to change.
                    </SheetDescription>
                </SheetHeader>
                <Tabs defaultValue="overview" className="w-full h-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="overview" className="w-1/2">Overview</TabsTrigger>
                        <TabsTrigger value="messages" className="w-1/2">Messages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="flex flex-col h-[70vh] lg:h-[62vh] gap-5 py-2">
                            <div className=" w-full h-[30%] gap-1.5">
                                <Label htmlFor="message">Your information</Label>
                                <Textarea placeholder="Type your message here." id="message" className="h-[98%]" />
                            </div>
                            <div className=" w-full h-[50%] gap-1.5">
                                <Label htmlFor="message">Your curriculum</Label>
                                <Textarea placeholder="Type your message here." id="message" readOnly className="h-[98%]" />
                            </div>
                            <div className="w-full h-[20%] flex flex-row gap-2">
                                <BigButton text="Export to .PDF" icon={FileText} callback={handleExportPDF} />
                                <BigButton text="Export to .DOC" icon={Text} callback={handleExportText} />
                                <BigButton text="Copy" icon={ClipboardCopy} callback={handleCopy} />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="messages">
                        <MessageSelector/>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    </>
}

function BigButton({ text, icon: Icon, callback }: BigButtonProps) {
    return (
        <Button className="w-1/3 h-max flex flex-col items-center justify-center my-auto gap-1 py-2" onClick={callback}>
            <Icon className="w-6 h-6" /> {/* Adjust icon size as needed */}
            <p>{text}</p>
        </Button>
    );
}