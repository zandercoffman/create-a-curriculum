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
            alert(typeof form2)
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
                description: "The form was not filled out correctly. " + err.message,
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
            <Breadcrumb className="normal-case">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Sheet>
                            <SheetTrigger className="lg:hidden">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <PanelRight className="transform rotate-180 w-full h-full" />
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
                                    <SheetDescription>
                                        Please provide the details needed to optimize your curriculum. All options in the Applicant Information setting are optional, respecting your privacy. Refer to our <PrivacyPopup /> for more details.
                                    </SheetDescription>
                                </SheetHeader>
                                <Tabs defaultValue="product-information" className="w-full flex flex-col justify-center max-h-[70vh] my-2">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="product-information" className="w-1/2">Product Information</TabsTrigger>
                                        <TabsTrigger value="information" className="w-1/2">Applicant Information</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="information">
                                        <ApplicantInfo form={form1} setForm={setForm1} />
                                    </TabsContent>
                                    <TabsContent value="product-information">
                                        <ProductInfoCard form={form2} setForm={setForm2} check={check} />
                                    </TabsContent>
                                </Tabs>
                                <Button className="w-full lg:mt-2" onClick={check} disabled={!submitButtonShow}>
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
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="absolute bottom-0 left-0 w-full mb-5 ml-5 flex flex-row gap-2">
                                    <Button variant={"destructive"}
                                    onClick={del}>Delete Data</Button>
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