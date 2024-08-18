"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

enum CurriculumTypes {
    Default,
    Museum,
    FieldTrip
}

export default function PromptPage() {
    const [product, setProduct] = useState<string>("");
    const [products, setProducts] = useState<{ id: number; label: string }[]>([]);
    const [lessons, setLessons] = useState(5);
    const [type, setType] = useState<CurriculumTypes>(CurriculumTypes.Default);

    const { toast } = useToast();

    const makeCurriculum = useCallback((): string => {
        if (product == "" && products.length == 0)
            return ''
        else if (type == CurriculumTypes.FieldTrip)
            return `
Write a curriculum that has the word "educational" somewhere in it with scope and sequence, 
learning objectives, ${lessons} detailed lessons in order, activity, and assessment for a child wanting 
to learn about ${products.length > 0 ? products.map(product => ` ${product.label}`) : product} Field Trip.  Please provide a comprehensive list of all materials needed 
for a ${products.length > 0 ? products.map(product => ` ${product.label}`) : product} Field Trip curriculum, including the additional products mentioned. For each item, 
give a detailed explanation of how it is specifically used within the curriculum, including which lessons 
or activities it's used for and any particular techniques or applications involved. List materials at the end. 
            `.replaceAll("\n", "") + `\n${products.length > 0 ? products.map((product) => `\n- ${product.label} ticket`) : "-" + product + " ticket"}`
        else if (type == CurriculumTypes.Museum)
            return `
Write a curriculum that has the word "educational" somewhere 
in it with scope and sequence, learning objectives, 10 detailed 
lessons in order, activity, and assessment for a child wanting to learn 
${products.length > 0 ? products.map(product => ` ${product.label}`) : product}. Please provide a comprehensive list of all materials 
needed for a ${products.length > 0 ? products.map(product => ` ${product.label}`) : product}  curriculum, including the additional products 
mentioned. For each item, give a detailed explanation of how it is specifically 
used within the curriculum, including which lessons or activities it's used for 
and any particular techniques or applications involved. List materials at the end. 

                
        `.replaceAll("\n", "") + `\n${products.length > 0 ? products.map(product => `\n- ${product.label} ticket`) : "-" + product + " ticket"} `
        return `
Write a curriculum that has the word "educational" somewhere in it with scope and sequence, 
learning objectives, ${lessons} detailed lessons in order, activity, and assessment for a child wanting 
to learn about ${products.length > 0 ? products.map(product => ` ${product.label}`) : product}.  Please provide a comprehensive list of all materials needed for the
${products.length > 0 ? products.map(product => ` ${product.label}`) : product} curriculum, including the additional products mentioned. For each item, give a 
detailed explanation of how it is specifically used within the curriculum, including which lessons 
or activities it's used for and any particular techniques or applications involved. List materials at the end.`.replaceAll("\n", "");
    }, [product, products, type, lessons]);


    const [prompt, setPrompt] = useState("");

    const set = (s: string) => {
        if (s == "Museum")
            setType(CurriculumTypes.Museum);
        else if (s == "Field Trip")
            setType(CurriculumTypes.FieldTrip);
        else
            setType(CurriculumTypes.Default);
    }

    useEffect(() => {
        setPrompt(makeCurriculum())
    }, [makeCurriculum])

    const addRow = () => {
        const newProduct = { id: products.length + 1, label: "" };
        setProducts([...products, newProduct]);
    };

    const updateProductLabel = (id: number, label: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, label } : p));
    };

    const deleteRow = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return <>
        <main className="w-screen h-screen grid place-items-center overflow-x-hidden lg:overflow-hidden">
            <div className="size-[90%] lg:size-[80%]">
                <div className="flex flex-col lg:flex-row gap-10 h-[200vh] lg:size-full">
                    <ScrollArea className="w-full lg:w-1/2 overflow-y-auto max-h-[98vh] pr-4">
                        <div >
                            <div className="w-full flex flex-col gap-4">
                                <Select onValueChange={(value) => set(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Curriculum Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Default">Default</SelectItem>
                                            <SelectItem value="Museum">Museum</SelectItem>
                                            <SelectItem value="Field Trip">Field Trip</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-row gap-2">
                                    <p className="w-1/3 lg:w-[20%]">Lessons: <span className="font-bold">{lessons}</span></p>
                                    <Slider
                                        defaultValue={[lessons]}
                                        max={15}
                                        min={1}
                                        step={1}
                                        onValueChange={(e) => setLessons(e[0])}
                                        className="w-full"
                                    />
                                </div>

                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        {type == CurriculumTypes.FieldTrip ? "Field Trip Name" : type == CurriculumTypes.Museum ? "Museum Name" : "Product"}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="w-full">
                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                <Input type="text" id="product" placeholder="Enter Product Here" value={product} onChange={(e) => setProduct(e.target.value)} />
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Multiple Products</AccordionTrigger>
                                    <AccordionContent>
                                        <Table>
                                            <TableCaption>List of your materials</TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">ID</TableHead>
                                                    <TableHead>Label</TableHead>
                                                    <TableHead>Delete</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody >
                                                {products.map((product) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell className="font-medium">{product.id}</TableCell>
                                                        <TableCell>
                                                            <Input
                                                                type="text"
                                                                value={product.label}
                                                                onChange={(e) => updateProductLabel(product.id, e.target.value)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() => deleteRow(product.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Button onClick={addRow} className="mt-4">Add Product</Button>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </ScrollArea>


                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Your Prompt:
                        </h2>
                        <Textarea
                            placeholder="Type your message here."
                            className="h-[85vh] lg:h-full"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            spellCheck={false}
                            data-gramm={false}
                        />
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(prompt).then(() => {
                                    toast({
                                        title: "Successfully copied!",
                                        description: "Enjoy your prompt to be used."
                                    })
                                }).catch((err) => {
                                    toast({
                                        title: "There was an error trying to copy.",
                                        variant: "destructive"
                                    })
                                })
                            }}
                        >Copy</Button>
                    </div>
                </div>
                <p className="text-center lg:text-left">Made by <Link href={"https://create-a-curriculum.vercel.app/"} className="text-blue-500 font-semibold">create-a-curriculum.vercel.app</Link>. <Link href={"https://forms.gle/eCGixYxjtVYJ4QK99"} className="text-blue-500 font-semibold">Reccomendation Form</Link></p>
            </div>
        </main>
    </>
}
