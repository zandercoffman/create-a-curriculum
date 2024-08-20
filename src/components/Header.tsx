"use client"

import { ArrowRightFromLine, PanelRight, Slash } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import BreadCrumbHeader from "./BreadCrumbHeader";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ExportButton from "./ExportButton";
import { useState } from "react";

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
    submit: (form2: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null) => void;
    buttonRef: any;
    exportRef: any;
    c: boolean
}

export default function Header(props: Props) {

    const [ud, setUD] = useState<FORM1 | null>(null);
    const [sel, setSel] = useState<number>(0);

    return (
        <div className="w-full h-[10vh] px-4 flex flex-row flex-shrink-0 overflow-auto justify-between size-7 select-none items-center rounded-b-lg bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
            <BreadCrumbHeader submit={props.submit} setUD={setUD} />
            <ExportButton
                messages={props.messages}
                buttonRef={props.buttonRef}
                userData={ud}
                sel={sel} // Pass down state
                setSel={setSel} // Pass down setter
                exportRef={props.exportRef}
                c={props.c}
            />
        </div>
    );
}
