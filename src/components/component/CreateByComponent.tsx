"use state"

import { TriangleAlertIcon, Ellipsis, ListIcon, FilePenIcon, FilePenLineIcon } from "lucide-react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "../ui/popover"
import { Switch } from "../ui/switch"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Item } from "@/lib/galleryItems"
import { useState } from "react"
import { Badge } from "../ui/badge"

interface FORM2PRODUCT {
    name: string;
    description: string;
    lessons: number;
}

export default function CreateByComponent(
    {
        product,
        searchQuery,
        selectedSubject,
        input,
        submit,
        closePopover
    }: {
        product: Item,
        searchQuery: string,
        selectedSubject: string,
        input: string,
        submit: Function,
        closePopover: Function
    }
) {

    const [sel, setSel] = useState(false);

    return <div className="flex flex-col md:flex-row bg-background rounded-lg shadow-lg overflow-hidden">
        <Image
            src={`/productImages/${product.name.toLowerCase().replace(/\s+/g, "")}.jpeg`}
            alt={product.name}
            width={400}
            height={400}
            className="md:w-1/2 object-cover"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
        />
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between lg:max-w-[70%]">
            <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>
            <div className="flex flex-row gap-4">
                <Button size="sm" className="mt-2 w-full relative"
                onClick={() => {
                    closePopover()
                    submit({
                        name: product.name,
                        description: "",
                        lessons: 5,
                    } as FORM2PRODUCT, null, product.curriculum && product.curriculum)
                    
                }}>
                    Create Curriculum
                    {
                        product.curriculum && <>
                            <Badge variant={"destructive"} className="absolute right-[-20px] top-[-11px]">Special Curriculum</Badge>
                        </>
                    }
                </Button>
                <Popover>
                    <PopoverTrigger className=" flex items-center">
                        <Ellipsis className="w-6 h-6 mt-2" />
                    </PopoverTrigger>
                    <PopoverContent className="p-6 rounded-2xl">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Create by..
                        </h3>
                        <div className="flex flex-row gap-2 mt-2 w-full text-center">
                            <div className="flex flex-col cursor-pointer items-center gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-muted-foreground hover:text-muted-foreground w-1/2"
                                onClick={() => {
                                    closePopover()
                                    submit({
                                        name: selectedSubject + " " + product.name,
                                        description: "",
                                        lessons: 5,
                                    } as FORM2PRODUCT, null, product.curriculum && product.curriculum)
                                    
                                }}>
                                <ListIcon className="h-8 w-8" />
                                <span className="text-sm font-medium">Subject</span>
                                <span className="text-xs">{selectedSubject} {product.name}</span>
                            </div>
                            <div className="flex flex-col cursor-pointer items-center gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-muted-foreground hover:text-muted-foreground w-1/2"
                                onClick={() => {
                                    closePopover()
                                    submit({
                                        name: input  + " " + product.name,
                                        description: "",
                                        lessons: 5,
                                    } as FORM2PRODUCT, null, product.curriculum && product.curriculum)
                                    
                                }}>
                                <FilePenLineIcon className="h-8 w-8" />
                                <span className="text-sm font-medium">Input</span>
                                <span className="text-xs">{input} {product.name}</span>
                            </div>
                        </div>
                        {
                            (selectedSubject !== "" && input !== "") && <>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row cursor-pointer gap-2 rounded-md bg-muted p-4 transition-colors hover:bg-muted-foreground hover:text-muted-foreground w-full mt-2 text-left"
                                    onClick={() => {
                                        closePopover()
                                        submit({
                                            name: !sel ? selectedSubject + " " + input : input + " " + selectedSubject,
                                            description: "",
                                            lessons: 5,
                                        } as FORM2PRODUCT, null, product.curriculum && product.curriculum)
                                        
                                    }}>
                                        <div className="w-[30%]">
                                            <FilePenIcon className="h-8 w-8" />
                                            <span className="text-sm font-medium">Or Both</span>
                                        </div>
                                        <div className="w-[70%]">
                                            <span className="text-xs !leading-1">
                                                {
                                                    !sel ? <>
                                                        {selectedSubject} {input}
                                                    </> : <>
                                                        {input} {selectedSubject}
                                                    </>
                                                }
                                                {" " + product.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row font-semibold gap-3 mx-auto">
                                        <p>Switch Order</p>
                                        <Switch checked={sel} onCheckedChange={() => setSel(!sel)} />
                                    </div>
                                </div>
                            </>
                        }
                    </PopoverContent>
                </Popover>
            </div>

        </div>
    </div>
}