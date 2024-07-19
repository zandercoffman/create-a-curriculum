"use client"
import Header from "@/components/Header";
import Image from "next/image";
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Paperclip, Send, CircleHelp, Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplashScreen from "@/components/SplashScreen";
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "@/components/ChatBubble";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { getLink } from "../../public/Link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import ChatHistory from "@/components/ChatHistory";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const formSchemaLink = z.object({
  link: z.string().refine(
    (value) => value.includes("http") && value.includes("/") && value.includes("."),
    {
      message: "Link must contain 'http', at least one '/', and at least one '.'.",
    }
  ).default(""),
})

const messages: string[] = [
  /**
   * "**Hello** Hello",
  "Hey!",
  "How can I help?",
  "You can help by...",
  "Sure, I can help with that.",
  "Can you provide more details?",
  "Of course. What exactly do you need help with?",
  "I need help with my project.",
  "Let's dive deeper into your project details.",
  "It's about creating an AI chat interface.",
  "That sounds interesting. What features would you like to include?",
  "I want suggestions on top and a chat input below.",
  "Got it. I can guide you through that.",
  "Thank you!",
  "You're welcome! Let's get started."
   */
];

export default function Home() {
  

  const [able, setAble] = useState(false);
  const form = useForm<z.infer<typeof formSchemaLink>>({
    resolver: zodResolver(formSchemaLink),
  })

  function onsubmitLink(values: z.infer<typeof formSchemaLink>) {
    alert(getProductFromLink(values.link));
  }

  function getProductFromLink(link: string) {
    const linkParsed = getLink(link);
    return linkParsed;
  }


  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header />

      {/** Es Tiempo de enviar mensajes (suavemente) */}
      <div className="w-full lg:h-[90vh] h-[92vh] flex justify-center">
        <div className="w-[98vw] lg:w-[40vw] lg:h-[90vh] relative flex flex-col px-6 py-2">
          <div className="flex flex-row gap-2 mx-auto lg:mx-0">
            <ChatHistory/>
          </div>
          <ScrollArea className="w-full mx-auto lg:w-[38vw] flex flex-col gap-1 h-[80%] p-2">

            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className={`w-2/3 lg:w-full flex justify-${index % 2 !== 0 ? "end" : "start"}`}>
                  <MessageBubble isUser={index % 2 !== 0} text={message} />
                </div>
              ))
            ) : (
              <SplashScreen />
            )}
          </ScrollArea>
          <div className="w-full h-[10%] bg-slate-300 dark:bg-slate-600 dark:text-white rounded-full flex flex-row gap-3 items-center px-5">
            <Popover>
              <PopoverTrigger>
                <Button className="p-0 !bg-transparent dark:text-white text-black transform rotate-[-45deg]" disabled={!able}><Paperclip className="dark:text-white" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onsubmitLink)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter link here" {...field} />
                          </FormControl>
                          <FormDescription className="flex flex-col">
                            <span>Your product: </span><span className="font-bold text-lg leading-5">{getProductFromLink(field.value)}</span><span className="mt-2"><span className="font-bold">Note:</span> The algorithm may not capture every link accurately.</span>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Generate</Button>
                  </form>
                </Form>
              </PopoverContent>
            </Popover>
            <Input placeholder={able ? "Enter Message Here.." : "Fill out form fully.."} className="!bg-transparent !border-0 w-full text-1xl" disabled={!able} />
            <Button className="p-0 !bg-transparent text-black" disabled={!able}><Send className="dark:text-white" /></Button>
          </div>
          <h1 className="text-center text-gray-700 dark:text-white font-semibold text-xs">Note: This AI uses <Link href="https://llama.meta.com/" className="font-bold">Meta-Llama</Link> and may make mistakes.</h1>
          <h1 className="text-center text-gray-700 dark:text-white font-semibold text-xs">&copy; COPYRIGHT create-a-curriculum.vercel.app OF {new Date().getFullYear()}</h1>
        </div>
      </div>
    </main>
  );
}
