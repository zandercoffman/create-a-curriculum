"use client"
import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from 'react'
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
import { useChat, Message } from 'ai/react'
import { generateId } from 'ai';

const formSchemaLink = z.object({
  link: z.string().refine(
    (value) => value.includes("http") && value.includes("/") && value.includes("."),
    {
      message: "Link must contain 'http', at least one '/', and at least one '.'.",
    }
  ).default(""),
})

interface FORMStorage {
  name: string;
  desc: string;
  id: string;
}

interface LINKStorage {
  name: string;
  link: string;
  id: string;
}

interface NAMESStorage {
  names: string[];
  id: string;
}

interface userData {
  name: string;
  uniqueid: string;
  grade: number | undefined | string;
  saveinfo: boolean;
}

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

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat()
  const [id, setId] = useState<string>(generateId());

  const [able, setAble] = useState(false);
  const form = useForm<z.infer<typeof formSchemaLink>>({
    resolver: zodResolver(formSchemaLink),
  })

  

  function getProductFromLink(link: string) {
    const linkParsed = getLink(link);
    return linkParsed;
  }

  const submit = (form2: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null): void => {
    const newMessage: Message = {
      id: new Date().toISOString(),
      content: decideCurToUse(form2),
      role: 'user'
    };

    const updatedMessages = [...messages, newMessage];
    const currentChatId = localStorage.getItem("currentChatId");

    setTimeout(() => {
      const aiResponse: Message = {
        id: new Date().toISOString(),
        content: "Ah cool!",
        role: 'assistant'
      };

      setMessages([...updatedMessages, aiResponse]);
      handleLocalStorage([...updatedMessages, aiResponse], aiResponse.id, form2);
    }, 500);

    handleLocalStorage([...updatedMessages], null, form2);
  };


  useEffect(() => {
    const me = localStorage.getItem("messageData");
    if (me) {
      const parsed: any[] = JSON.parse(me);
      if (parsed) {
        const filter = (item: any) => {
          return item.id == id;
        }

        var filtered = [];
        if (Array.isArray(parsed)) {
          filtered = parsed.filter(filter);
        }

        if (typeof filtered[0] !== 'undefined') {
          setMessages(filtered[0]["messages"] as Message[]);
        } else {
          setMessages([]);
        }

        localStorage.setItem("currentChatId", id);

      }
    }
  }, [id, setMessages])

  const handleLocalStorage = (messagesToSave: Message[], lastAiMessageId: string | null, data: FORM2TITLES | FORM2PRODUCT | LINKStorage) => {
    const d = localStorage.getItem("enabledHistory");
  
    if (d) {
      let chatHistory: any[] = [];
  
      const storedData = localStorage.getItem("messageData");
      if (storedData) {
        try {
          chatHistory = JSON.parse(storedData);
          if (!Array.isArray(chatHistory)) {
            chatHistory = [];
          }
        } catch (err) {
          console.error("Failed to parse chat history from localStorage", err);
          chatHistory = [];
        }
      }
  
      const currentChatId = localStorage.getItem("currentChatId");
  
      if (currentChatId) {
        const chatIndex = chatHistory.findIndex((chat: any) => chat.id === currentChatId);
        if (chatIndex >= 0) {
          chatHistory[chatIndex].messages = messagesToSave;
        } else {
          const newId = generateId();
          const newChat = {
            id: newId,
            name: 'titles' in data ? "Collection of " + data.titles.split(",").length : data.name,
            type: ('titles' in data ? "titles" : ('link' in data ? "link" : "form")),
            extra: 'titles' in data ? JSON.stringify(data.titles.split(",")) : 'link' in data ? data.link : "",
            messages: messagesToSave,
          };
          chatHistory.push(newChat);
          localStorage.setItem("currentChatId", newId);
        }
      } else {
        const newId = generateId();
        const newChat = {
          id: newId,
          messages: messagesToSave,
        };
        chatHistory.push(newChat);
        localStorage.setItem("currentChatId", newId);
      }
  
      localStorage.setItem("messageData", JSON.stringify(chatHistory));
    }
  };

  function onsubmitLink(values: z.infer<typeof formSchemaLink>) {
    alert(getProductFromLink(values.link));
    submit({
      name: getProductFromLink(values.link),
      link: values.link,
      id: generateId()
    } satisfies LINKStorage, null);
  }

  const getTitleValue = (s: string): string => {
    try {
      // Parse the JSON string to an object
      const obj = JSON.parse(s);
  
      // Access the 'titles' property
      return obj.titles || "Woopsies";
    } catch (e) {
      // Handle JSON parsing errors
      return "Woopsies";
    }
  };

  const decideCurToUse = (obj: FORM2TITLES | FORM2PRODUCT | LINKStorage): string => {
    if ('link' in obj) {
      return `Link details: Name: ${obj.name}, Link: ${obj.link}`;
    } else if ('titles' in obj) {
      return `${makeCurriculums(getTitleValue(obj.titles).split(","))}`;
    } else if ('name' in obj) {
      return `Form data: Name: ${obj.name}, Description: ${obj.description}`;
    } else {
      return "Unknown data type";
    }
  }

  function makeCurriculum(activity: string): string {
    return `
        Curriculum for ${activity}:

        Write a curriculum that has the word "educational" somewhere in it. The curriculum should include the following elements for a child wanting to learn how to engage in ${activity}: 

        1. **Scope and Sequence**
        2. **Learning Objectives**
        3. **15 Detailed Lessons in Order**
        4. **Activities**
        5. **Instructional Materials Required**
        6. **Assessment**

        Also, list the educational benefits of learning how to use ${activity}, the subjects it covers, and a brief history of ${activity}. Finally, provide a summary of materials required at the end.

        Ensure that the curriculum for using ${activity} is comprehensive and engaging for young learners.
    `;
  }

  function makeCurriculums(activities: string[]): string {
    if (activities.length == 1) {
      return makeCurriculum(activities[0]);
    }

    const activitiesStr = `${activities.slice(0, -1).join(', ')} and ${activities[activities.length - 1]}`

    return `
      Curriculum for ${activitiesStr}:

      Write a curriculum that includes the word "educational" and covers the following for a child learning ${activitiesStr}:

      1. Scope and Sequence
      2. Learning Objectives
      3. 15 Detailed Lessons in Order
      4. Activities
      5. Instructional Materials Required
      6. Assessment

      Include the educational benefits of ${activitiesStr}, the subjects it covers, and a brief history of ${activitiesStr}. Provide a summary of materials required at the end.

      Make sure the curriculum is comprehensive and engaging for young learners. 
      ${activities.length > 1 && `Your goal is to blend ${activitiesStr} into a cohesive curriculum.`}
    `;
}

  function cleanString(input: string): string {
    return input
        .replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
        .trim();              // Remove leading and trailing whitespace
  }



  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header messages={messages} submit={submit} />

      {/** Es Tiempo de enviar mensajes (suavemente) */}
      <div className="w-full lg:h-[90vh] h-[92vh] flex justify-center">
        <div className="w-[98vw] lg:w-[40vw] lg:h-[90vh] relative flex flex-col px-6 py-2">
          <div className="flex flex-row gap-2 mx-auto lg:mx-0 max-w-[90%] lg:max-w-[94%]">
            <ChatHistory setId={setId} id={id} />
          </div>
          <ScrollArea className="w-[85vw] mx-auto lg:w-[40vw] flex flex-col gap-10 lg:gap-3 h-[80%] p-2 overflow-auto">
            {messages.length > 0 ? (
              messages.map((m: Message) => (
                <MessageBubble text={cleanString(m.content)} key={m.id} isUser={m.role === "user"} />
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
          <h1 className="text-center text-gray-700 dark:text-white font-semibold text-xs mt-1">Note: This AI uses <Link href="https://llama.meta.com/" className="font-bold">Meta-Llama</Link> and may make mistakes.</h1>
        </div>
      </div>
    </main>
  );
}
