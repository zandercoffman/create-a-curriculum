"use client"

import { ArrowRightFromLine, Github, PanelRight, Slash } from "lucide-react";
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


interface FORM1 {
    name: string;
    uniqueid: string;
    grade: number | undefined | string;
    saveinfo: boolean;
}

interface FORM2TITLES {
    titles: string;
}

interface FORM2PRODUCT {
    name: string;
    description: string;
}



export default function BreadCrumbHeader() {

    const { toast } = useToast()
    const [form1, setForm1] = useState<FORM1 | null>(null);
    const [form2, setForm2] = useState<FORM2TITLES | FORM2PRODUCT | null>(null);
    const [submitButtonShow, setSubmitButton] = useState(false);

    const check = () => {
        try {
            if (form2 === null || form2 === undefined) {
                throw new Error();
            } else {
                if ('name' in form2 && form2.name === "") {
                    throw new Error();
                } else {
                    //Do the right stuff
                }
            }
        } catch (err) {
            toast({
                variant: "destructive",
                title: "There was an error.",
                description: "The form was not filled out correctly. Please make sure Product Information is filled out.",
            })
        }
    }

    useEffect(() => {
        setSubmitButton(
            form1 !== null && form2 !== null
        )
    }, [form1, form2])

    return <>
        <Breadcrumb className="normal-case">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Sheet>
                        <SheetTrigger className="lg:hidden">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant="outline" className="!bg-transparent px-0 !border-0">
                                            <PanelRight className="transform rotate-180 w-full h-full" />
                                        </Button>
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
                                    <ProductInfoCard form={form2} setForm={setForm2} />
                                </TabsContent>
                            </Tabs>
                            <Button className="w-full lg:mt-2" onClick={check} disabled={!submitButtonShow}>Submit</Button>
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
                                <Button variant="outline" className="!bg-transparent px-0 !border-0">
                                    <InformationTab />
                                </Button>
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
                <BreadcrumbItem >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" className="!bg-transparent px-0 !border-0">
                                    <GithubTab />
                                </Button>
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
            </BreadcrumbList>
        </Breadcrumb>
    </>
}

function Slashy() {
    return <Slash className="size-6 text-zinc-200" />
}