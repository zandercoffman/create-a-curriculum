"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
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
import { OrSeparator } from "@/components/or-separator";
import { Checkbox } from "@/components/ui/checkbox";


export default function RebuttalPage() {
    const [product, setProduct] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [desc, setDesc] = useState("");
    const { toast } = useToast();
    const [products, setProducts] = useState<{ id: number; label: string }[]>([]);
    const [type, setType] = useState("ESA Empowerment Scholarship Account");
    const [tiempodesarcasm, setSarcasim] = useState(false);

    const [productf, setProductf] = useState("");
    const [curf, setCurf] = useState("");
    const [isReq, setReq] = useState(false);

    const handleCheckboxChange = (event: boolean) => {
        setSarcasim(event);
    };

    const makePrompt = useCallback(() => {
        return `Write a ${tiempodesarcasm ? "sarcastic" : "formal"} letter appealing the initial rejection of the product(s) ${(productf != "" || curf != "") ? `"${productf}" from the original collection of ${curf}.` : products.length > 0 ? products.map(product => `"${product.label}"`).join(', ') : `"${product}"`
            } Argue why it should be considered an allowable expense under ${type}. Write it as a ${tiempodesarcasm ? "sarcastic" : "formal"} letter, ensuring the tone is ${tiempodesarcasm ? "VERY sarcastic and detailed to make it as funny as possible" : "professional and respectful"}. ${desc.length > 0 ? `\n\nAdditional context: ${desc}` : ""}${isReq ? `Also, ${productf} is required for the curriculum to begin. Please keep that in mind.` : ""}`.trim().replaceAll("\n", "")
    }, [curf, desc, isReq, product, productf, products, tiempodesarcasm, type])

    useEffect(() => {
        setPrompt(makePrompt());
    }, [makePrompt])

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
        <div className="w-screen h-max lg:h-[100vh] grid place-items-center p-14 overflow-hidden">
            <div className="flex flex-col lg:flex-row size-full gap-10">
                <div className="flex flex-col gap-2 w-full lg:w-1/2">
                    <ScrollArea className="w-full h-max lg:max-h-[90vh] pr-4 pb-10">
                        <div className="flex flex-col gap-1 mb-5">
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                Appeal Prompt Generator
                            </h2>
                            <p>Craft effective arguments to justify why your product should be approved.</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Single/Multiple Products
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid w-full items-center mb-4 gap-1.5">
                                        <Label htmlFor="product">Single Product</Label>
                                        <Input type="text" id="product" className="w-full" placeholder="Enter Product Here" value={product} onChange={(e) => setProduct(e.target.value)} />
                                    </div>
                                    <OrSeparator />
                                    <Label htmlFor="product">Multiple Products</Label>
                                    <Table>
                                        <TableCaption>List of your materials</TableCaption>
                                        <TableHeader>
                                            <TableRow>

                                                <TableHead>Label</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody >
                                            {products.map((product) => (
                                                <TableRow key={product.id}>

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
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Out of a Bunch</AccordionTrigger>
                                <AccordionContent>
                                    <div className="w-full md:max-w-md mx-auto space-y-4">
                                        <div className="flex flex-col lg:flex-row items-center gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="current">Product</Label>
                                                <Input id="current" className="w-full" value={productf} onChange={(e) => setProductf(e.target.value)} />
                                            </div>
                                            <span className="text-center mx-auto self-end mb-2">from</span>
                                            <div className="space-y-2">
                                                <Label htmlFor="total">Curriculum</Label>
                                                <Input id="total" className="w-full" value={curf} onChange={(e) => setCurf(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="required"
                                                checked={isReq}
                                                onCheckedChange={(e: boolean) => setReq(e)} />
                                            <label
                                                htmlFor="required"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Is necessary; otherwise, the curriculum cannot begin.
                                            </label>
                                        </div>
                                    </div>
                                    <p className="mt-4">Example: Paint is necessary to create artwork as paper is necessary to print.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <div className="flex flex-col gap-5 mt-5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea id="desc" className="w-full  h-[100px]" placeholder="Enter Other Details Here" value={desc} onChange={(e) => setDesc(e.target.value)} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="a">Type of Establishment</Label>
                                <Select onValueChange={(value) => setType(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="ESA Program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ESA Empowerment Scholarship Account">ESA Program</SelectItem>
                                        <SelectItem value="Federal Student Aid">Federal Student Aid</SelectItem>
                                        <SelectItem value="Arizona Department of Education Scholarship Program">Arizona DOE Scholarship</SelectItem>
                                        <SelectItem value="John and Jane Doe Scholarship Fund">Doe Scholarship Fund</SelectItem>
                                    </SelectContent>

                                </Select>
                            </div>


                        </div>
                        <div className="flex flex-row w-full items-center gap-2 mt-2">
                            <Label htmlFor="desc">Sarcasm Mode (Guaranteed to Shiver your Timbers 😂)</Label>
                            <Checkbox
                                checked={tiempodesarcasm}
                                onCheckedChange={handleCheckboxChange} />
                        </div>
                        <div className=" flex-col mt-10 hidden lg:flex">
                            <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                                <span className="font-bold">Note:</span> This product is not affiliated nor endorsed by the companies mentioned.
                            </p>
                            <p className="text-center lg:text-left">Made by <Link href={"https://create-a-curriculum.vercel.app/"} className="text-blue-500 font-semibold">create-a-curriculum.vercel.app</Link>. <Link href={"https://forms.gle/eCGixYxjtVYJ4QK99"} className="text-blue-500 font-semibold">Reccomendation Form</Link></p>
                        </div>
                    </ScrollArea>

                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Your Prompt:
                    </h2>
                    <Textarea
                        placeholder="Type your message here."
                        className="h-[85vh] lg:h-full w-full"
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
                    <div className="flex lg:hidden flex-col mt-10">
                        <p className="leading-7 text-center lg:text-left text-base [&:not(:first-child)]:mt-6">
                            <span className="font-bold">Note:</span> This product is not affiliated nor endorsed by the companies mentioned.
                        </p>
                        <p className="text-center lg:text-left">Made by <Link href={"https://create-a-curriculum.vercel.app/"} className="text-blue-500 font-semibold">create-a-curriculum.vercel.app</Link>. <Link href={"https://forms.gle/eCGixYxjtVYJ4QK99"} className="text-blue-500 font-semibold">Reccomendation Form</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </>
}