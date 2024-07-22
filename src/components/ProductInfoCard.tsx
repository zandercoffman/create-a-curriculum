"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import MultipleProductsForm from "./MultipleProductsForm";
import ChoiceSeperator from "./ChoiceSeperator";

// Define form schema with zod
const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required')
});

interface Props {
    form: any;
    setForm: Function;
    check: Function;
}

export default function ProductInfoCard(props: Props) {
    const [hasSubmitted, setHasSubmitted] = useState(props.form !== null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

    function onSubmit(values: any) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        alert(JSON.stringify(values));
        props.setForm(values);
        setHasSubmitted(true);
    }

    const doMultiple = (a: string[]) => {
        props.setForm(JSON.stringify(a));
        setHasSubmitted(true);
        props.check();
    }

    return (
        <ScrollArea className="lg:h-[300px] h-[65vh] xl:h-[60vh] w-full flex flex-col gap-2 pr-4">
            <MultipleProductsForm setForm={doMultiple}/>
            <ChoiceSeperator text="or" className="mb-3" />
            <Card className="h-[470px] mb-10 w-full">
                <CardHeader>
                    {hasSubmitted && <CardDescription>✅ You’ve submitted this section!</CardDescription>}
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>Fill out the form below:</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter name" {...field} disabled={hasSubmitted}/>
                                        </FormControl>
                                        <FormDescription>
                                            You can <span>@mention</span> other users and organizations.
                                        </FormDescription>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Description here"
                                                className="resize-none"
                                                {...field}
                                                disabled={hasSubmitted}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can <span>@mention</span> other users and organizations.
                                        </FormDescription>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
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
