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
}

export default function ExportButton(props: Props) {

    const [selIndex, setselIndex] = useState<number>(0);
    const [canedit, setedit] = useState(false)

    const { toast } = useToast();


    const [messageContent, setMessageContent] = useState<string>("");
    const [curriculumContent, setCurriculumContent] = useState<string>("");

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value.replace(/[^a-zA-Z0-9:]/g, ' ').replace(/\t/g, ''));
    };

    const handleCurriculumChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurriculumContent(e.target.value.replace(/[^a-zA-Z0-9:]/g, ' ').replace(/\t/g, ''));
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const mess = localStorage.getItem("messageData");
        if (mess && selIndex !== null) {
            const pased = JSON.parse(mess);
            const obj = pased[selIndex];

            const m = obj.messages;
            const goodm = m[m.length - 1];
            setCurriculumContent((goodm.content))
        }
    }, [selIndex])

    const sho = () => {
        if (props.userData !== null) {
            return `
                Applicant Name: ${props.userData.name}
                ID: ${props.userData.uniqueid}
            `
        } else {
            return ''
        }
    }

    const handleExportPDF = async () => {
        console.log("Export to PDF clicked");
        setLoading(true);

        // Define form1Data and form2Data
        const form1Data: FORM1 | null = props.userData || null; // Ensure props.userData matches FORM1 type or set to null
        const c = await remark().use(strip).process(curriculumContent);
        const form2Data = curriculumContent;

        try {
            // Send a POST request with form1 and form2 data
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    form1: form1Data,
                    form2: form2Data
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Create a blob from the response
            const blob = await response.blob();

            // Create a URL for the blob and trigger the download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'example.pdf'); // Set the filename for the download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
            toast({
                title: "Your .PDF file has been generated.",
                description: "Enjoy using it!"
            });
        } catch (error: any) {
            console.error('Error downloading PDF:', error);
            toast({
                title: "Error generating PDF",
                description: "There was a problem generating your PDF. Error: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleExportText = async () => {
        console.log("Export to DOCX clicked");
        setLoading(true);
    
        const form1Data: FORM1 | null = props.userData || null;
        const form2Data = curriculumContent;
    
        try {
            const response = await fetch('/api/generate-doc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    form2: form2Data,
                    form1: form1Data,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Convert response to blob and initiate download using file-saver
            const blob = await response.blob();
            saveAs(blob, 'curriculum.docx'); // Save the file with file-saver
    
            toast({
                title: "Your .DOC file has been generated.",
                description: "Enjoy using it!"
            });
        } catch (error: any) {
            console.error('Error downloading document:', error);
            toast({
                title: "Error generating DOCX",
                description: "There was a problem generating your DOCX. Error: " + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        console.log("Copy clicked");
        setLoading(true);
    
        const form1Data: FORM1 | null = props.userData || null;
        const form2Data = curriculumContent;

        try {
            navigator.clipboard.writeText(
                JSON.stringify(form1Data || "" + " " + form2Data).replace(/[^a-zA-Z0-9:]/g, ' ').replace(/\t/g, '')
            ).then(() => {
                toast({
                    title: "Successfully copied!",
                    description: "Enjoy using your curriculum!"
                })
            })
        } catch(err) {

        } finally {
            setLoading(false);
        }

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
                <Tabs defaultValue="messages" className="w-full h-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="messages" className="w-1/2">Messages</TabsTrigger>
                        <TabsTrigger value="overview" className="w-1/2">Overview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        {
                            selIndex == null ? <>
                                <div className="w-full grid h-[70vh] lg:h-[65vh] place-items-center">
                                    <div className="flex flex-col gap-2 items-center text-center ">
                                        <CircleSlash2 className="w-10 h-10" />
                                        <span className="text-2xl">We couldn{"'"}t locate any curriculums at the moment. Please check back later.</span>
                                        <span className="text-1xl"><span className="font-bold">Note:</span> Curriculums may not update immediately. Please try refreshing the page.</span>
                                    </div>
                                </div>
                            </> : <>
                                <div className="flex flex-col h-[70vh] lg:h-[62vh] py-2 gap-2 mx-auto">
                                    {
                                        props.userData !== null && <>
                                            <div className=" w-full h-[30%] gap-1.5">
                                                <Label htmlFor="message">Your information</Label>
                                                <Textarea
                                                    placeholder="Type your message here."
                                                    id="message"
                                                    value={sho()}
                                                    onChange={handleMessageChange}
                                                    readOnly={!canedit}
                                                    className="h-[98%]"
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className=" w-full h-[50%] gap-1.5">
                                        <Label htmlFor="curriculum">Your curriculum</Label>
                                        <Textarea
                                            placeholder="Type your message here."
                                            id="curriculum"
                                            value={curriculumContent}
                                            onChange={handleCurriculumChange}
                                            readOnly={!canedit}
                                            className="h-[98%]"
                                        />
                                    </div>
                                    <Badge className="mx-auto">Selected Message: Curriculum #{selIndex + 1}</Badge>
                                    <div className="w-full h-[20%] flex flex-row gap-2">
                                        {
                                            loading ? <>
                                                <div className="grid place-items-center w-full h-full" >
                                                    <div className="flex flex-row gap-2 mx-auto my-auto text-center">
                                                        <Loader className="animate-spin" />
                                                        <p>Your file is currently being generated!</p>
                                                    </div>
                                                </div>
                                            </> : <>
                                                <BigButton text="Export to .PDF" icon={FileText} callback={handleExportPDF} />
                                                <BigButton text="Export to .DOC" icon={Text} callback={handleExportText} />
                                                <BigButton text="Copy" icon={ClipboardCopy} callback={handleCopy} />
                                            </>
                                        }


                                    </div>
                                    <Button onClick={() => setedit(!canedit)}>Toggle Editable (Currently: {canedit ? 'Can Edit' : 'Cannot edit'})</Button>
                                    <div className="text-center">
                                        (.doc is the best format as of now)
                                    </div>
                                </div>
                            </>
                        }

                    </TabsContent>
                    <TabsContent value="messages">
                        <MessageSelector setselIndex={setselIndex} selIndex={selIndex} />
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
