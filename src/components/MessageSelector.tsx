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
import React, { SVGProps, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Message } from "ai"
import { CircleSlash2, ClipboardCopy, FileText, LoaderCircle, Pencil, SquareArrowOutUpRight, Text, UserRound } from "lucide-react"
import Markdown from "react-markdown"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "./ui/use-toast"
import { Badge } from "./ui/badge"
import { remark } from 'remark'
import strip from 'strip-markdown'
import { saveAs } from 'file-saver';
import { Textarea } from "./ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const formSchema = z.object({
    username: z.string().optional(),
    id: z.string().optional(),
    grade: z.string().optional(),
    saveInfo: z.boolean().optional(),
})

interface FORM1 {
    username: string
    id: string
    grade: string
    saveInfo: boolean
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

interface LSUD {
    name: string,
    id: string,
    grade: number,
}

export default function MessageSelector(props: any) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(props.selIndex || 0);
    const [count, setCount] = React.useState<number>(0);

    const [userData, setUserData] = useState<FORM1 | null>(null);

    const [lsData, setLSData] = useState<LSUD[] | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const a = localStorage.getItem("data");
            if (a) {
                setLSData(JSON.parse(a) as LSUD[])
            }
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            id: "",
            grade: "",
            saveInfo: false
        },
    })

    const [submit, setSubmitted] = useState<boolean>(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setUserData(values as FORM1);
        setSubmitted(true);

        if (values.saveInfo) {
            const data = localStorage.getItem("data");
            const obj = {
                name: values.username,
                id: values.id,
                grade: values.grade,
            }

            const users = []

            if (data) {
                const arr = JSON.parse(data);
                users.push(...arr);
            }

            users.push(obj);
            localStorage.setItem("data", JSON.stringify(users))
        }
    }

    const [data, setData] = useState<MessageDat[]>([]);
    const [loading, setLoading] = useState(true);
    const [cant, setCant] = useState(false);
    const [selectedUser, setSelectedUser] = useState<number>(-1);

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

    function capitalizeFirstLetter(string: string = " ") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleExportPDF = async () => {
        console.log("Export to PDF clicked");
        setLoading(true);

        // Define form1Data and form2Data
        const form1Data: FORM1 | null = {
            username: userData?.username || "",
            id: userData?.id || "",
            grade: userData?.grade || "",
            saveInfo: false
        } || null; // Ensure props.userData matches FORM1 type or set to null
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

        const form1Data: FORM1 | null = {
            username: userData?.username || "",
            id: userData?.id || "",
            grade: userData?.grade || "",
            saveInfo: false
        } || null;
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

        const form1Data: FORM1 | null = {
            username: userData?.username || "",
            id: userData?.id || "",
            grade: userData?.grade || "",
            saveInfo: false
        } || null;
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

    const handleCurriculumChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurriculumContent(e.target.value.replace(/[^a-zA-Z0-9:]/g, ' ').replace(/\t/g, ''));
    };

    
    const cry = (num: number, key: any) => {
        setSelectedUser(num);
        if (lsData) {
            onSubmit(
                {
                    username: lsData[key].name,
                    id: lsData[key].id,
                    grade: JSON.stringify(lsData[key].grade),
                    saveInfo: false
                }
            );
        }
    }

    if (cant) {
        return <>
            <div className="w-full grid h-[70vh] lg:h-[65vh] place-items-center">
                <div className="flex flex-col gap-2 items-center text-center">
                    <CircleSlash2 className="w-10 h-10" />
                    <span className="text-2xl">We couldn{"'"}t locate any curriculums at the moment. Please check back later.</span>
                    <span className="text-1xl"><span className="font-bold">Note:</span> Curriculums may not update immediately. Please try pressing to a different section.<span className="hidden lg:block">On desktop, resize your browser to be in the shape of a mobile screen and maximise. This is a bug and will be patched.</span></span>
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
        <div className="flex flex-col h-[72vh] lg:h-[70vh]  mx-auto gap-3 py-2">
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
            <div className="h-[300px] w-[90%] mx-auto flex flex-row my-auto">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-fit h-[50px] mx-auto flex flex-row gap-1 relative">
                            User Data
                            <UserRound />
                            <Badge className="absolute top-0 right-0 transform translate-x-[30%] translate-y-[-50%]" variant={"secondary"}>{submit ? "In Use" : "Optional"}</Badge>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] lg:w-[60vw] h-[80vh] lg:h-[90vh] rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="flex flex-row gap-1">
                                User Data
                                <UserRound />
                            </DialogTitle>
                            <DialogDescription className="text-left">
                                Make changes to your profile here. Click save when you{"'"}re done.
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] lg:h-[65vh]">
                            <Accordion type="single" collapsible className="w-full pr-2" defaultValue={lsData !== null ? "item-2" : "item-1"}>
                                {lsData !== null && <>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Use Existing Applicants</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableCaption>A list of your stored applicants.</TableCaption>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[200px]">Name</TableHead>
                                                        <TableHead>ID</TableHead>
                                                        <TableHead>Grade</TableHead>
                                                        <TableHead className="text-right">Select</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        Object.keys(lsData).map((key: any, index) => {
                                                            return <TableRow key={index}>
                                                                <TableCell className="font-medium">{lsData[key].name}</TableCell>
                                                                <TableCell>{lsData[key].id}</TableCell>
                                                                <TableCell>{lsData[key].grade}</TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button
                                                                        onClick={() => {
                                                                            cry(index, key);
                                                                        }}
                                                                        disabled={selectedUser == index ? true : false}
                                                                    >{selectedUser == index ? "Currently Selected" : "Use Applicant"}</Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>

                                        </AccordionContent>
                                    </AccordionItem>
                                </>}

                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Use/Add New Applicant</AccordionTrigger>
                                    <AccordionContent>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                                <FormField
                                                    control={form.control}
                                                    name="username"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter name here" {...field} disabled={submit} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is a name that will be displayed on the curriculum.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>ID</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter a unique identifier" {...field} disabled={submit} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is a unique identifier that will be displayed on the curriculum.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="grade"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Grade</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={submit}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a grade" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                                                                    <SelectItem value="1">1st Grade</SelectItem>
                                                                    <SelectItem value="2">2nd Grade</SelectItem>
                                                                    <SelectItem value="3">3rd Grade</SelectItem>
                                                                    <SelectItem value="4">4th Grade</SelectItem>
                                                                    <SelectItem value="5">5th Grade</SelectItem>
                                                                    <SelectItem value="6">6th Grade</SelectItem>
                                                                    <SelectItem value="7">7th Grade</SelectItem>
                                                                    <SelectItem value="8">8th Grade</SelectItem>
                                                                    <SelectItem value="9">9th Grade (Freshman)</SelectItem>
                                                                    <SelectItem value="10">10th Grade (Sophomore)</SelectItem>
                                                                    <SelectItem value="11">11th Grade (Junior)</SelectItem>
                                                                    <SelectItem value="12">12th Grade (Senior)</SelectItem>
                                                                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                                                    <SelectItem value="Graduate">Graduate</SelectItem>
                                                                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                                                                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                                                                </SelectContent>

                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="saveInfo"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                            <FormControl>
                                                                <Checkbox
                                                                    onCheckedChange={field.onChange}
                                                                    disabled={submit}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel>
                                                                    Save Info for Future Curriculums
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    Securely save your preferences.
                                                                </FormDescription>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button type="submit" disabled={submit}>{!submit ? "Submit" : "Already Submitted"}</Button>
                                            </form>
                                        </Form>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-fit h-[50px] mx-auto flex flex-row gap-1">
                            Edit Curriculum
                            <Pencil />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[80vw] lg:w-[60vw] h-[90vh] rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="flex flex-row gap-2">
                                Edit Curriculum
                                <Badge className="flex flex-row gap-1"><span className="hidden lg:block">Curriculum</span> #{current}</Badge>
                            </DialogTitle>
                            <DialogDescription>
                                Make changes to your generated curriculum here. Press save when you{"'"}re done.
                            </DialogDescription>
                        </DialogHeader>
                        <Textarea
                            placeholder="Type your message here."
                            id="curriculum"
                            value={curriculumContent || ""}
                            onChange={handleCurriculumChange}
                            className="h-[60vh] lg:h-[55vh]"
                        />
                        <DialogFooter>
                            <p className="my-auto mr-auto text-sm lg:text-base text-center text-gray-600 leading-1">Leave the markdown triggers (ex. **text**). They are necessary.</p>
                            <Button className="my-auto">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className=" flex flex-row gap-2">
                <BigButton text="Export to .PDF" icon={FileText} callback={handleExportPDF} />
                <BigButton text="Export to .DOC" icon={Text} callback={handleExportText} badge={"Best Format"} />
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
    badge?: string | null;
}

function BigButton({ text, icon: Icon, callback, badge = null }: BigButtonProps) {
    return (
        <Button className="relative w-1/3 h-max flex flex-col items-center justify-center my-auto gap-1 py-2" onClick={callback}>
            <Icon className="w-6 h-6" />
            <p>{text}</p>
            {
                badge !== null && (
                    <Badge className="absolute top-0 right-0 transform translate-x-[30%] z-10 translate-y-[-60%]" variant={"destructive"}>{badge}</Badge>
                )
            }
        </Button>
    );
}
