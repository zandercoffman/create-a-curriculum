import { AlarmClock, Eye, Info, Pencil, Send, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactElement, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";


// Define TypeScript interface for carousel items
interface CarouselItem {
    id: string;
    title: string;
    html: ReactElement;
}

// Define items with JSX content
const carouselItems: CarouselItem[] = [
    {
        id: "overview",
        title: "Overview",
        html: (
            <>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>
                        Create A Curriculum is an AI-driven platform designed to simplify and streamline the process of curriculum creation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <Image src="/logoshort.png" alt="logo" width={250} height={80} className="rounded-3xl" />
                        <div className="w-full h-full flex flex-col lg:flex-row gap-2">
                            <div className="h-full w-full lg:w-2/3">
                                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    Features
                                </h2>
                                <ul className="list-disc mt-2">
                                    <li>Curriculum Generation based on a product.</li>
                                    <li>Inputting a link to generate a curriculum</li>
                                    <li>Entering multiple product names to quickly generate</li>
                                    <li>Saving history of chats (COMING SOON)</li>
                                </ul>
                            </div>
                            <div className="h-full w-full lg:w-1/3">
                                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    About
                                </h2>
                                <div className="flex flex-col gap-1 mt-3 pr-10">
                                    <div className="flex flex-row gap-1 items-center">
                                        <Image src="/profilepic.jpg" alt="logo" width={40} height={40} className="rounded-full" />
                                        <span className="font-semibold">@zandercoffman</span>
                                    </div>
                                    If you ever need to reach me, email <span onClick={() => window.location.href = "mailto:zandercoffman34@gmail.com"} className="font-semibold cursor-pointer text-blue-500">zandercoffman34@gmail.com</span>.
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </>
        )
    },
    {
        id: "features",
        title: "Key Features",
        html: (
            <>
                <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                    <CardDescription>Learn about the key features of our application and what makes us different.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc mt-1">
                        <li className="ml-4"><span className="font-bold">AI-Powered Customization</span>: Generates personalized curricula based on user input.</li>
                        <li className="ml-4"><span className="font-bold">User-Friendly Interface</span>: Easy to navigate and use for educators and developers.</li>
                        <li className="ml-4"><span className="font-bold">Versatile Applications</span>: Suitable for various educational levels and subjects.</li>
                        <li className="ml-4"><span className="font-bold">Quick and Effective</span>: Our quick approach, utilizing links and multiple products, simplifies everything.</li>
                        <li className="ml-4"><span className="font-bold">No-Cost</span>: Our product is offered at no cost, making quality education accessible to a broader audience without any financial barriers.</li>
                    </ul>
                </CardContent>
            </>
        )
    },
    {
        id: "problem",
        title: "The Problem",
        html: (
            <>
                <CardHeader>
                    <CardTitle>The Problem</CardTitle>
                    <CardDescription>Learn about what makes our product stand out.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-5 lg:gap-3 h-[15%] w-full text-left mb-1">
                        <div className="h-full w-full lg:w-[30%] flex-col gap-2">
                            <div className="flex flex-row gap-1">
                                <span className="font-bold">1.</span> Find a cool product. <Eye />
                            </div>
                            <div className="text-sm">
                                As you browse through various stores, you might come across a product that piques your interest or multiple products that catch your eye.
                            </div>
                        </div>
                        <div className="h-full w-full lg:w-[30%] flex-col gap-2">
                            <div className="flex flex-row">
                                <span className="font-bold">2.</span> Submit information in a template. <Send />
                            </div>
                            <div className="text-sm">
                                The current process involves manually copying and pasting each title, description, and template, which is repetitive and time-consuming, resulting in an inefficient workflow.
                            </div>
                        </div>
                        <div className="h-full w-full lg:w-[30%] flex-col gap-2">
                            <div className="flex flex-row">
                                <span className="font-bold">3.</span> Export the text to a usable file. <Pencil />
                            </div>
                            <div className="text-sm">
                                Once you’ve gotten your generated curriculum, you have to export this text to a file. This process involves manually copying and pasting the text into a document.
                            </div>
                        </div>
                        <div className="h-full w-full lg:w-[10%] grid place-items-center my-auto">
                            <div className="flex w-full h-full flex-col gap-2 items-center justify-center">
                                <AlarmClock className="w-10 h-10"/>
                                <p className="text-sm text-center">It takes a considerable amount of time!</p>
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <div className="mt-1 mb-2 lg:mb-0">
                        <span className="font-semibold">With the growing demand for education, we have opted for a more innovative and fast approach.</span> <br />
                        <span className="text-sm leading-3">The only thing you have to do is list your products/link, and we do all of the hard work for you.</span>
                    </div>
                </CardFooter>
            </>
        )
    },
    {
        id: "faq",
        title: "FAQ",
        html: (
            <>
                <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                    <CardDescription>Learn about questions that may normally be asked.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[20vh] lg:h-auto">
                        <div >
                            <Accordion type="single" collapsible className="w-full h-full flex flex-col lg:flex-row gap-10 pr-3" >
                                <div className="w-full lg:w-1/2 h-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>Code</AccordionTrigger>
                                        <AccordionContent>
                                            <ul>
                                                <li><span className="font-bold">Will you release the code?</span> No, I will not be releasing the code, it is under a private repository.</li>
                                                <li><span className="font-bold">How did you make the website?</span> I used React and TypeScript.</li>
                                                <li><span className="font-bold">How did you get the AI?</span> I used Meta{"'"}s Llama AI. <Link href="https://llama.meta.com/" className="text-blue-500">Find more here:</Link></li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Privacy</AccordionTrigger>
                                        <AccordionContent className="text-xs">
                                            <ul>
                                                <li><span className="font-bold">How are inputs handled?</span> Personal information is kept separate from product data; only product information is shared with the AI. See the privacy overview for details.</li>
                                                <li><span className="font-bold">How is my information protected?</span> Your information is secure, compliant with Vercel’s firewall, and protected by HTTPS encryption. Information is not saved by default. All created content remains local and is accessible only to you.</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                                <div className="w-full lg:w-1/2 h-full">
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>How do I use the site?</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <div className="w-full lg:w-full h-full">
                                                    <h1 className="font-bold">Form</h1>
                                                    <ul className="text-xs list-disc">
                                                        <li>Press the button in the top-left of the screen to initate the form.</li>
                                                        <li>You have <span className="font-semibold">two</span> ways to fill out the product information:</li>
                                                        <li className="ml-3">Enter the product name, description, and more attributes.</li>
                                                        <li className="ml-3">Enter titles of many products you want related.</li>
                                                    </ul>
                                                </div>
                                                <div className="w-full lg:w-full h-full">
                                                    <h1 className="font-bold">Link</h1>
                                                    <ul className="text-xs list-disc">
                                                        <li>In the main screen, click the paperclip icon.</li>
                                                        <li>This will lead you to an input for a link.</li>
                                                        <li className="font-semibold">This part only works if the link has the product in it.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>I have a question/comment/inquiry.</AccordionTrigger>
                                        <AccordionContent>
                                            You can reach me over at my business email: <Link href={"mailto:zandercoffman34@gmail.com"} className="text-blue-500 font-bold">zandercoffman34@gmail.com</Link>. I may be busy at times because I am a student, but I will get back to emails as soon as I can.
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            </Accordion>
                        </div>
                    </ScrollArea>
                </CardContent>
            </>
        )
    }
];

export default function InformationTab() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const getFromId = (s: string) => {
        return carouselItems.filter((item) => item.id == s)[0];
    }

    return (
        <Dialog>
            <DialogTrigger><Info /></DialogTrigger>
            <DialogContent className="w-[90vw] lg:w-[70vw] h-[95vh] lg:h-[85vh] !rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Welcome to Create-A-Curriculum!</DialogTitle>
                    <DialogDescription>
                        This product, crafted by a solo developer, leverages AI to simplify curriculum creation.
                        Users can input a topic or product and receive a tailored, effective educational curriculum,
                        making it easier to develop high-quality learning materials. Click a topic to learn more.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full h-[95%] pt-5 lg:pt-0 my-auto flex flex-col lg:flex-row overflow-hidden">

                    <Carousel className={"w-[90%] mx-auto h-[85%]  items-center my-auto "} orientation={isMobile ? "vertical" : "horizontal"}>
                        <CarouselContent className="h-[60vh]">
                            {carouselItems.map(item => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    className={"w-[90%] mx-auto " + (isMobile ? "h-[85%] my-2 " : "")}
                                    onClick={() => setSelectedId(item.id)}
                                >
                                    <CarouselItem className="basis-1/2">
                                        <Card className="h-[30vh] lg:h-[40vh] flex items-center justify-center text-center font-semibold text-2xl cursor-pointer">
                                            {item.title}
                                        </Card>
                                    </CarouselItem>

                                </motion.div>
                            ))}

                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                </div>

                <AnimatePresence>
                    {selectedId && (
                        <motion.div layoutId={selectedId}>
                            <ScrollArea className="h-[70vh] lg:h-screen">
                                <Card className="w-full h-[340px] lg:h-[390px] text-center lg:text-left lg:overflow-hidden">
                                    {getFromId(selectedId).html}
                                    <motion.button onClick={() => setSelectedId(null)} className="absolute top-0 right-0 mt-3 mr-3" ><X className="text-gray-500" /></motion.button>
                                </Card>
                            </ScrollArea>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
