"use client"

import { ArrowRightFromLine, Cog, Github, PanelRight, Settings, Slash } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import InformationTab from "./InformationTab";
import UserProfile from "./UserProfile";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ApplicantInfo from "./ApplicantInfoCard";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import ProductInfoCard from "./ProductInfoCard";
import GithubTab from "./GithubTab";
import PrivacyPopup from "./PrivacyPopup";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area";


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
    submit: (form2: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null) => void;
    setUD: Function;
}

export default function BreadCrumbHeader(props: Props) {
    const { toast } = useToast();
    const [form1, setForm1] = useState<FORM1 | null>(null);
    const [form2, setForm2] = useState<FORM2TITLES | FORM2PRODUCT | null>(null);
    const [submitButtonShow, setSubmitButton] = useState(false);

    const check = () => {
        try {
            if (!form2) {
                throw new Error('Form2 is null or undefined.');
            }
            // Debugging: Log form data before submission
            console.log("Submitting form2:", form2);
            console.log("Submitting form1:", form1);

            if (typeof form2 == 'string') {
                if (form2 !== "") {
                    props.submit({ titles: form2 } satisfies FORM2TITLES, form1);
                }
            } else if ('name' in form2) {
                if (form2.name !== "") {
                    props.submit(form2, form1);
                }
            } else {
                throw new Error('Form2 does not match expected types.');
            }



            // Call the submit function

        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "There was an error.",
                description: "The form was not filled out correctly. Note: If you are submitting via titles, hit the button again.",
            });
        }
    };

    const del = () => {
        localStorage.clear();
        toast({
            title: "Successfully deleted!",
        })
        window.location.reload();

    }

    useEffect(() => {
        setSubmitButton(
            form2 !== null
        );
        props.setUD(form1 as FORM1);
    }, [form1, form2, props]);

    return (
        <>
            <Breadcrumb className="normal-case flex-shrink-0">
                <BreadcrumbList className="flex flex-row max-w-fit flex-nowrap overflow-auto flex-shrink-0">
                    <BreadcrumbItem>
                        <Sheet>
                            <SheetTrigger className="lg:hidden">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="flex-shrink-0">
                                            <PanelRight className="transform rotate-180 w-full h-full !flex-shrink-0" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Toggle Information Panel</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SheetTrigger>
                            <SheetContent side={"left"} className="rounded-r-3xl">
                                <SheetHeader>
                                    <SheetTitle>Form</SheetTitle>
                                    <SheetDescription className="text-base">
                                        <ScrollArea className="lg:h-[80px] overflow-auto">
                                            To optimize your curriculum, please provide the details needed. See our <PrivacyPopup /> for more information.
                                        </ScrollArea>
                                    </SheetDescription>
                                </SheetHeader>
                                <ProductInfoCard form={form2} setForm={setForm2} check={check} />
                                <Button className="w-full" onClick={check} disabled={!submitButtonShow}>
                                    Submit
                                </Button>
                            </SheetContent>
                        </Sheet>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="lg:hidden dark:opacity-40">
                        <Slashy />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <InformationTab />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Learn More</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="dark:opacity-40">
                        <Slashy />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <GithubTab />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Learn More</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="dark:opacity-40">
                        <Slashy />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <ThemeSwitcher />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="dark:opacity-40">
                        <Slashy />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <Dialog>
                            <DialogTrigger><Settings className="mb-2" /></DialogTrigger>
                            <DialogContent className="w-[95vw] lg:w-[60vw] rounded-xl h-[90vh]">
                                <DialogHeader>
                                    <DialogTitle>Settings</DialogTitle>
                                </DialogHeader>
                                <div className="w-[90%] mx-auto mb-auto h-max">
                                    <div className="w-full h-max flex text-center lg:text-left  flex-col lg:flex-row gap-2">
                                        <div className="flex flex-col">
                                            <h1 className="font-bold">Delete your Data</h1>
                                            <p>Delete your preferences, messages, and more.</p>
                                        </div>
                                        <div className="mx-auto lg:ml-auto">
                                            <Button variant={"destructive"}
                                                onClick={del}>Delete Data</Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>


                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
}

function Slashy() {
    return <Slash className="size-6 text-zinc-200" />;
}