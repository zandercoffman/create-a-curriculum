"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

// Define form schema with zod
const formSchema = z.object({
    name: z.string().optional().default(""),
    uniqueid: z.string().optional().default(""),
    saveInfo: z.boolean().default(false).optional(),
    grade: z.string().default("").optional().default(""),
    wantstousegrade: z.boolean().default(false).optional()
});

interface Props {
    form: any;
    setForm: Function;
}

interface FORM1 {
    name: string;
    uniqueid: string;
    grade: number | undefined | string;
    saveinfo: boolean;
    wantstousegrade: boolean;
}


export default function ApplicantInfo(props: Props) {

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            saveInfo: false,
            wantstousegrade: false,
            name: "",
            uniqueid: "",
            grade: ""
        }
    });

    function onSubmit(values: any) {
        props.setForm(values as FORM1);
    }

    useEffect(() => {
        setHasSubmitted(props.form !== null);
    }, [props.form])

    return (
        <ScrollArea className="lg:h-[280px] xl:h-[60vh] h-[65vh] w-full">
            <Card className="h-[70%] mb-10 w-full">
                <CardHeader>
                    {hasSubmitted && <CardDescription>✅ You’ve submitted this section!</CardDescription>}
                    <CardTitle>Applicant Information</CardTitle>
                    <CardDescription>Fill out the form below:</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={!hasSubmitted ? "Enter name" : props.form.name} {...field} disabled={hasSubmitted} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="uniqueid"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unique Identifier</FormLabel>
                                        <FormControl>
                                            <Input placeholder={!hasSubmitted ? "Enter identifier" : props.form.uniqueid} {...field} disabled={hasSubmitted} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row gap-3">
                                <FormField
                                    control={form.control}
                                    name="grade"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Grade</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={hasSubmitted} >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={!hasSubmitted ? "Select a grade to tailor your needs." : props.form.grade} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Pre-K">Pre-K</SelectItem>
                                                    <SelectItem value="Kindergarden">Kindergarden</SelectItem>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5">5</SelectItem>
                                                    <SelectItem value="6">6</SelectItem>
                                                    <SelectItem value="7">7</SelectItem>
                                                    <SelectItem value="8">8</SelectItem>
                                                    <SelectItem value="9">9</SelectItem>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="11">11</SelectItem>
                                                    <SelectItem value="12">12</SelectItem>
                                                    <SelectItem value="College+">College+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="wantstousegrade"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center justify-center">
                                            <FormLabel>Use?</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={!hasSubmitted ? field.value : props.form.wantstousegrade}
                                                    onCheckedChange={field.onChange}
                                                    disabled={hasSubmitted}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="saveInfo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hidden">
                                        <FormControl>
                                            <Checkbox
                                                checked={!hasSubmitted ? field.value : props.form.saveInfo}
                                                onCheckedChange={field.onChange}
                                                disabled={true}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none blur-sm">
                                            <FormLabel>
                                                Save Info for Future Curriculums
                                            </FormLabel>
                                            <FormDescription>
                                                Securely save your preferences.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant={"secondary"} className="mt-2" disabled={hasSubmitted}>Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </ScrollArea>

    );
}
