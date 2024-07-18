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

export default function Header() {
    return (
        <div className="w-full h-[10vh] px-4 flex flex-row justify-between size-7 shrink-0 select-none items-center rounded-b-lg bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
            <BreadCrumbHeader />
            <ExportButton/>
        </div>
    );
}
