"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import React, { SVGProps, useState } from "react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Message } from "ai"
import { CircleSlash2, ClipboardCopy, FileText, LoaderCircle, SquareArrowOutUpRight, Text } from "lucide-react"
import Markdown from "react-markdown"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "./ui/use-toast"
import { Badge } from "./ui/badge"
import { remark } from 'remark'
import strip from 'strip-markdown'
import { saveAs } from 'file-saver';

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

interface MessageDat {
    id: string;
    name: string;
    type: string;
    extra: any;
    messages: Message[]
}

export default function MessageSelector(props: any) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(props.selIndex || 0);
    const [count, setCount] = React.useState<number>(0);

    const [data, setData] = useState<MessageDat[]>([]);
    const [loading, setLoading] = useState(true);
    const [cant, setCant] = useState(false);

    const [selected, setSelected] = useState<number>(() => {
        const savedIndex = localStorage.getItem("selectedCurriculumIndex");
        if (!savedIndex) {
            localStorage.setItem("selectedCurriculumIndex", "0");
            return 0;
        } else {
            return parseInt(savedIndex)
        }
    });

    const { toast } = useToast();

    const copy = async (s: string) => {
        try {
            await navigator.clipboard.writeText(s);
            toast({
                title: "Successfully copied to clipboard!"
            })
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    React.useEffect(() => {
        try {
            const m = localStorage.getItem("messageData");
            if (m) {
                const j = JSON.parse(m);
                const sel = j[current - 1];
                const messages = sel.messages;
                setCurriculumContent(messages[messages.length - 1].content || "");
            }
        } catch (err) {

        }
    }, [current]);

    const [curriculumContent, setCurriculumContent] = useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const dat = localStorage.getItem("messageData");
            if (dat && dat.length > 0) {
                setData(JSON.parse(dat) as MessageDat[]);
                props.setselIndex(props.selIndex);
                setLoading(false);
            } else {
                setCant(true);
                return;
            }
        }
    }, [props]);

    const handleSelect = (index: number) => {
        setSelected(index);
        localStorage.setItem("selectedCurriculumIndex", selected.toString());
    }

    function capitalizeFirstLetter(string: string = " ") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleExportPDF = async () => {
        console.log("Export to PDF clicked");
        setLoading(true);

        // Define form1Data and form2Data
        const form1Data: FORM1 | null = props.userData || null; // Ensure props.userData matches FORM1 type or set to null
        const c = await remark().use(strip).process(curriculumContent as string);
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
        } catch (err) {

        } finally {
            setLoading(false);
        }

    };

    if (cant) {
        return <>
            <div className="w-full grid h-[70vh] lg:h-[65vh] place-items-center">
                <div className="flex flex-col gap-2 items-center text-center">
                    <CircleSlash2 className="w-10 h-10" />
                    <span className="text-2xl">We couldn{"'"}t locate any curriculums at the moment. Please check back later.</span>
                    <span className="text-1xl"><span className="font-bold">Note:</span> Curriculums may not update immediately. Please try pressing to a different section.</span>
                </div>
            </div>
        </>
    }

    if (loading) {
        return <>
            <div className="w-full grid h-[50vh] lg:h-[65vh] place-items-center">
                <div className="flex flex-col gap-2 align-center items-center">
                    <LoaderCircle className="animate-spin w-10 h-10" />
                    <h1>Creating your curriculum...</h1>
                </div>
            </div>
        </>
    }

    return <>
        <div className="flex flex-col h-[80vh] lg:h-[69vh]  mx-auto gap-3 py-2">
            <Carousel setApi={setApi} className="w-[80%] mx-auto">
                <CarouselContent>
                    {data.map((dat, index) => (
                        <CarouselItem key={index}>
                            <Card className="text-center">
                                <CardHeader>
                                    <CardTitle className="text-[18px] leading-5">{dat.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge>{capitalizeFirstLetter(dat.type)}</Badge>
                                </CardContent>
                            </Card>
                            <Dialog>
                                <DialogTrigger className="text-left w-full overflow-hidden">
                                    <Card className="w-full mx-auto relative h-full">
                                        <CardContent className="flex w-full h-full py-3">
                                            <div className="text-center my-auto text-[16px]">Full Curriculum</div>
                                            <Button className="ml-auto !bg-transparent !p-0 text-black dark:text-white"><SquareArrowOutUpRight className="w-4 h-4" /></Button>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>

                                <DialogContent className="w-[90vw] lg:w-[80vw] rounded-xl pr-5 ">
                                    <DialogHeader className="font-extrabold">
                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                            {dat.name}
                                        </h3>
                                    </DialogHeader>
                                    <ScrollArea className="w-[80vw] lg:w-[78vw] h-[75vh] overflow-hidden relative">
                                        <div className="whitespace-normal">
                                            <Markdown>{`${dat.messages[dat.messages.length - 1].content}`}</Markdown>
                                        </div>
                                        <div className="absolute bottom-0 right-0 size-2 mr-8 w-10 h-10 grid place-items-center bg-gray-200">
                                            <Button onClick={() => copy(dat.messages[dat.messages.length - 1].content)}><ClipboardCopy /></Button>
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Curriculum {current} of {count}
            </div>
            <div className="mt-auto flex flex-row gap-2">
                <BigButton text="Export to .PDF" icon={FileText} callback={handleExportPDF} />
                <BigButton text="Export to .DOC" icon={Text} callback={handleExportText} />
                <BigButton text="Copy" icon={ClipboardCopy} callback={handleCopy} />
            </div>
        </div>
    </>
}

/**
 * 
 * <div className="flex flex-col h-[70vh] lg:h-[65vh] gap-3 py-2">
            <Carousel setApi={setApi} className="w-[80%] mx-auto">
                <CarouselContent>
                    {data.map((dat, index) => (
                        <CarouselItem key={index}>
                            <Card className="text-center">
                                <CardHeader>
                                    <CardTitle className="text-[18px] leading-5">{dat.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge>{capitalizeFirstLetter(dat.type)}</Badge>
                                </CardContent>
                            </Card>
                            <Dialog>
                                <DialogTrigger className="text-left w-full overflow-hidden">
                                    <Card className="w-full mx-auto relative h-full">
                                        <CardContent className="flex w-full h-full py-3">
                                            <div className="text-center my-auto text-[16px]">Full Curriculum</div>
                                            <Button className="ml-auto !bg-transparent !p-0 text-black dark:text-white"><SquareArrowOutUpRight className="w-4 h-4" /></Button>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>

                                <DialogContent className="w-[90vw] lg:w-[80vw] rounded-xl pr-5 ">
                                    <DialogHeader className="font-extrabold">
                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                            {dat.name}
                                        </h3>
                                    </DialogHeader>
                                    <ScrollArea className="w-[80vw] lg:w-[78vw] h-[75vh] overflow-hidden relative">
                                        <div className="whitespace-normal">
                                            <Markdown>{`${dat.messages[dat.messages.length - 1].content}`}</Markdown>
                                        </div>
                                        <div className="absolute bottom-0 right-0 size-2 mr-8 w-10 h-10 grid place-items-center bg-gray-200">
                                            <Button onClick={() => copy(dat.messages[dat.messages.length - 1].content)}><ClipboardCopy /></Button>
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="text-center text-sm text-muted-foreground">
                Curriculum {current} of {count}
            </div>

            <div className="mt-auto">
                <Button className="w-full" variant={selected === current + 1 ? 'secondary' : 'default'}
                    onClick={() => handleSelect(current - 1)}
                >{selected === current + 1 ? 'Currently Selected' : 'Select'}</Button>
            </div>
        </div>
 */
interface BigButtonProps {
    text: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    callback?: () => void; // Optional callback function
}

function BigButton({ text, icon: Icon, callback }: BigButtonProps) {
    return (
        <Button className="w-1/3 h-max flex flex-col items-center justify-center my-auto gap-1 py-2" onClick={callback}>
            <Icon className="w-6 h-6" /> {/* Adjust icon size as needed */}
            <p>{text}</p>
        </Button>
    );
}