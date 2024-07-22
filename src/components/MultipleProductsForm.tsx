"use client"

import { Textarea } from "@/components/ui/textarea"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FileInput, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"


interface Item {
    name: string;
    selected: boolean;
}

interface Props {
    setForm: Function
}

interface FORM2TITLES {
    titles: string;
}


export default function MultipleProductsForm(props: Props) {
    const { toast } = useToast()

    const [items, setItems] = useState<Item[]>([]);

    const submit = () => {
        const names: string[] = [];
    
        Object.keys(items).forEach((key: any) => {
            names.push(items[key].name);
        });
    
        const form: FORM2TITLES = {
            titles: names.join(", "), // Joining names with a comma and space
        };
    
        props.setForm(form); // Assuming setForm expects an object of type FORM2TITLES
    };
    

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newItems = [...items];
        newItems[index].name = event.target.value;
        setItems(newItems);
    };

    const handleCheckBoxChange = (index: number, event: React.FormEvent<HTMLButtonElement>) => {
        const newItems = [...items];
        newItems[index].selected = !newItems[index].selected;
        setItems(newItems);
    }

    const add = () => {
        const item: Item = { name: "", selected: false };
        setItems([...items, item]);
    }

    const del = () => {
        const func = (obj: Item) => {
            return !(obj.selected == true);
        }

        const NOTselectedInArray = items.filter(func);

        if (NOTselectedInArray.length !== items.length) {
            toast({
                title: "Successfully deleted!",
            })
        }

        setItems(NOTselectedInArray);
    }


    return (
        <div className="flex justify-center items-center w-full mt-2">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="w-full">
                        <div className="flex flex-row gap-1 items-center">
                            <FileInput /> Enter Titles of Products
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardHeader>
                                <CardTitle>Multiple Products</CardTitle>
                                <CardDescription>Tired of entering products one by one? Want to combine products? Simplify the process—just input the titles, and let the AI handle the rest.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableCaption className="items-center w-full">
                                        <div className="flex flex-row gap-2 w-full ">
                                            <Button variant={"outline"} onClick={add}><Plus /></Button>
                                            <Button variant={"outline"} onClick={del}><Trash2 /></Button>
                                        </div>
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Select</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>
                                                        <Input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(event) => handleInputChange(index, event)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={item.selected}
                                                            onClick={(event) => handleCheckBoxChange(index, event)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>

                            </CardContent>
                            <CardFooter className="flex flex-row gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button type="submit" variant={"secondary"} className="w-full" onClick={submit}>Quick Submit</Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Submit and Automatically ask the AI
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardFooter>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
