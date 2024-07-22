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
interface LINKStorage {
    name: string;
    link: string;
    id: string;
  }
  

interface Props {
    messages: any;
    submit: (form2: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null) => void;
}

export default function Header(props: Props) {
    return (
        <div className="w-full h-[10vh] px-4 flex flex-row justify-between size-7 shrink-0 select-none items-center rounded-b-lg bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
            <BreadCrumbHeader submit={props.submit} />
            <ExportButton messages={props.messages}/>
        </div>
    );
}
