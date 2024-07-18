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


export default function BreadCrumbHeader() {
    return <>
        <Breadcrumb className="normal-case">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Sheet>
                        <SheetTrigger>
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
                        <SheetContent side={"left"} >
                            <SheetHeader>
                                <SheetTitle>Form</SheetTitle>
                                <SheetDescription>
                                Please provide the details needed to optimize your curriculum. All options in the Applicant Information setting are optional, respecting your privacy. Refer to our privacy overview for more details.
                                </SheetDescription>
                            </SheetHeader>
                            <Tabs defaultValue="information" className="w-full flex flex-col justify-center mt-2">
                                <TabsList className="w-full">
                                    <TabsTrigger value="information" className="w-1/2">Applicant Information</TabsTrigger>
                                    <TabsTrigger value="product-information" className="w-1/2">Product Information</TabsTrigger>
                                </TabsList>
                                <TabsContent value="information"><ApplicantInfo/></TabsContent>
                                <TabsContent value="product-information">Change your product information here.</TabsContent>
                            </Tabs>

                        </SheetContent>
                    </Sheet>

                </BreadcrumbItem>
                <BreadcrumbSeparator>
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
                <BreadcrumbSeparator>
                    <Slashy />
                </BreadcrumbSeparator>
                <BreadcrumbItem >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" className="!bg-transparent px-0 !border-0">
                                    <Link href="https://github.com/zandercoffman"><Github /></Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Learn More</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slashy />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <ThemeSwitcher/>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slashy />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <UserProfile />
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </>
}

function Slashy() {
    return <Slash className="size-6 text-zinc-200" />
}