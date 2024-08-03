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
import React, { useState } from "react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Message } from "ai"
import { CircleSlash2, ClipboardCopy, LoaderCircle, SquareArrowOutUpRight } from "lucide-react"
import Markdown from "react-markdown"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "./ui/use-toast"
import { Badge } from "./ui/badge"

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
        props.setselIndex(current - 1);
    }, [current, props]);

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
            <div className="w-full grid h-[70vh] lg:h-[65vh] place-items-center">
                <div className="flex flex-col gap-2">
                    <LoaderCircle className="animate-spin w-10 h-10" />
                </div>
            </div>
        </>
    }

    return <>
        hello
        {selected}
        <div className="flex flex-col h-[70vh] lg:h-[65vh]  w-[80%] mx-auto gap-3 py-2">
            <Carousel setApi={setApi} className="w-full max-w-xs">
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
                Slide {current} of {count}
            </div>
            <div className="mt-auto">
                <Button className="w-full" variant={selected === current - 1 ? 'secondary' : 'default'}
                    onClick={() => handleSelect(current - 1)}
                >{selected === current - 1 ? 'Currently Selected' : 'Select'}</Button>
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
