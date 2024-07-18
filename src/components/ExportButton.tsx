import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ArrowRightFromLine } from "lucide-react"

export default function ExportButton() {
    return <>
        <Sheet>
            <SheetTrigger>
                <Button className="transform rotate-180">
                    <div className="flex flex-row gap-2 items-center w-fit overflow-hidden">
                        <div className="w-6 h-6 flex-shrink-0 transform rotate-180">
                            <ArrowRightFromLine className="w-full h-full" />
                        </div>

                        <h1 className="flex-1 transform rotate-180">Export as..</h1>

                    </div>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </>
}