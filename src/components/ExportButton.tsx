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
import { ArrowRightFromLine, CircleSlash2, Loader } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Text, ClipboardCopy } from "lucide-react";
import { SVGProps, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MessageSelector from "./MessageSelector"
import { Badge } from "./ui/badge"
import { useToast } from "./ui/use-toast"

import { remark } from 'remark'
import strip from 'strip-markdown'
import { saveAs } from 'file-saver';


interface BigButtonProps {
    text: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    callback?: () => void; // Optional callback function
}

interface FORM1 {
    name: string;
    uniqueid: string;
    grade: number | undefined | string;
    saveinfo: boolean;
    wantstousegrade: boolean;
}

interface FORM2TITLES {
    titles: string;
}

interface FORM2PRODUCT {
    name: string;
    description: string;
    lessons: number;
}

interface LINKStorage {
    name: string;
    link: string;
    id: string;
}

interface Props {
    messages: any;
    buttonRef: any;
    userData: FORM1 | null;
    sel: number;
    setSel: Function;
}

export default function ExportButton(props: Props) {

    const [selIndex, setselIndex] = useState<number>(props.sel);
    const [selected, setSelected] = useState<number>(0);
    const [canedit, setedit] = useState(false)

    const { toast } = useToast();


    const [messageContent, setMessageContent] = useState<string>("");
    const [curriculumContent, setCurriculumContent] = useState<string | null>(null);

    useEffect(() => {
        const a = () => {
            const savedIndex = localStorage.getItem("selectedCurriculumIndex");
            if (!savedIndex) {
                localStorage.setItem("selectedCurriculumIndex", "0");
                return 0;
            } else {
                return parseInt(savedIndex)
            }
        };
        setSelected(a());
        
        const g = () => {
            const m = localStorage.getItem("messageData");
            if (m) {
                const j = JSON.parse(m);
                const sel = j[selected];
                const messages = sel.messages;
                return messages[messages.length - 1].content;
            } else {
                return null;
            }
        }

        setCurriculumContent(g());

        
    }, [selected])

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const mess = localStorage.getItem("messageData");
        props.setSel(props.sel);
        if (mess && selIndex !== null) {
            const pased = JSON.parse(mess);
            const obj = pased[selIndex];

            const m = obj.messages;
            const goodm = m[m.length - 1];
            setCurriculumContent((goodm.content))
        }
    }, [selIndex])

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
                <MessageSelector setselIndex={setselIndex} selIndex={selIndex} />
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