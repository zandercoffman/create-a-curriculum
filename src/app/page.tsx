"use client"
import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react'
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
import { generateId, ToolInvocation } from 'ai';

const formSchemaLink = z.object({
  link: z.string().refine(
    (value) => value.length > 1,
    {
      message: "Please enter a product.",
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
  wantstousegrade: boolean;
}

interface FORM2TITLES {
  titles: string;
}

interface FORM2PRODUCT {
  name: string;
  description: string;
  lessons: number;
}

interface LINKStorage {
  name: string;
  link: string;
  id: string;
}

interface MessageDat {
  id: string;
  name: string;
  type: string;
  extra: any;
  messages: Message[]
}

export default function Home() {
  const [id, setId] = useState<string>(generateId());
  const [canCreateNew, setCanNew] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [c, setc] = useState<boolean>(false);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click(); // Trigger the button click
    }
  };

  const { messages, input, handleInputChange, handleSubmit, setMessages, append } = useChat(
    {
      keepLastMessageOnError: true,
      onFinish(message: Message) {
        message.content = message.content.replace(/\n/g, '')
        const s = localStorage.getItem("enabledHistory");
        if (s) {
          const p = localStorage.getItem("messageData");
          if (p) {
            const parsed = JSON.parse(p);
            const filter = (item: any) => {
              return item.id == id;
            }
            var filtered: any[] = [];
            if (Array.isArray(parsed)) {
              filtered = parsed.filter(filter);
            }

            if (filtered.length > 0) {
              // Find the index of the filtered item in the parsed array
              const index = parsed.findIndex((item: any) => item.id === filtered[0].id);

              if (index !== -1) {
                filtered[0].messages[filtered[0].messages.length] = message;

                // Update the parsed array at the correct index
                parsed[index] = filtered[0];
                localStorage.setItem("messageData", JSON.stringify(parsed));
                setCanNew(true);
                setc(false);
              }
            }
          } else {
            const a: MessageDat = {
              id: "A",
              name: "Curriculum",
              type: "product",
              extra: "",
              messages: [message] as Message[]
            }
  
            localStorage.setItem("messageData", JSON.stringify(a));
            setc(false);
          }
        } else {

          const obj = [
            {
              id: localStorage.getItem("currentChatId") || "id",
              name: "Curriculum",
              type: "product",
              extra: "",
              messages: [message] as Message[]
            }
          ]

          localStorage.setItem("messageData", JSON.stringify(obj));
          localStorage.setItem("currentChatId", id);
          setc(false);
        }
      }
    }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("messageData") && !localStorage.getItem("enabledHistory"))
        localStorage.removeItem("messageData");
    }
  }, [])


  const [able, setAble] = useState(false);
  const form = useForm<z.infer<typeof formSchemaLink>>({
    resolver: zodResolver(formSchemaLink),
  })



  function getProductFromLink(link: string) {
    const linkParsed = getLink(link);
    return linkParsed;
  }

  const submit = async (form2: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null) => {
    
    setc(true);
    const input = decideCurToUse(form2, form1);

    // Append the user message
    const obj = {
      role: 'user',
      content: input,
      id: generateId()
    };



    append(obj as Message);
    const lastAiMessageId = messages.length > 0 ? messages[messages.length - 1].id : null;
    handleLocalStorage([...messages, obj] as Message[], lastAiMessageId, form2, id);
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

  const handleLocalStorage = (messagesToSave: Message[], lastAiMessageId: string | null, data: FORM2TITLES | FORM2PRODUCT | LINKStorage, chatId: string) => {
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

      const chatIndex = chatHistory.findIndex((chat: any) => chat.id === chatId);

      if (chatIndex >= 0) {
        chatHistory[chatIndex].messages = messagesToSave;
      } else {
        const newChat = {
          id: chatId,
          name: 'titles' in data ? "Collection of " + data.titles.split(",").length : data.name,
          type: ('titles' in data ? "titles" : ('link' in data ? "link" : "form")),
          extra: 'titles' in data ? JSON.stringify(data.titles.split(",")) : 'link' in data ? data.link : "",
          messages: messagesToSave,
        };
        chatHistory.push(newChat);
      }

      localStorage.setItem("messageData", JSON.stringify(chatHistory));
    }
  };

  function onsubmitLink(values: z.infer<typeof formSchemaLink>) {
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

  const decideCurToUse = (obj: FORM2TITLES | FORM2PRODUCT | LINKStorage, form1: FORM1 | null | undefined): string => {
    if ('link' in obj) {
      return `${makeCurriculum(obj.name, form1?.grade?.toString(), 8)}`;
    } else if ('titles' in obj) {
      return `${makeCurriculums(getTitleValue(obj.titles).split(","), form1?.grade?.toString(), 8)}`;
    } else if ('name' in obj) {
      return `${makeCurriculum(obj.name, form1?.grade?.toString(), obj.lessons)}`;
    } else {
      return "Unknown data type";
    }
  }

  function makeCurriculum(activity: string, grade: string | undefined | null = null, lesson: number = 7): string {
    return `
        Curriculum for ${activity}:

      Write a curriculum that has the word "educational" somewhere 
      in it with scope and sequence, learning objectives, activity, and assessment for 
      a child wanting to learn about ${activity}. 
      Please provide a comprehensive list of all materials 
      needed for the  ${activity} curriculum, including the 
      additional products mentioned. For each item, give a 
      detailed explanation of how it is specifically used within 
      the curriculum, including which lessons or activities it's 
      used for and any particular techniques or applications involved.
       List materials at the end.

      1. Scope and Sequence
      2. Learning Objectives
      3. ${lesson} Detailed Lessons in Order
      4. Activities
      5. Assessment

      Include the brief history of ${activity}. Provide a summary of materials required at the end and put a short explanation of it next to the material.

        Ensure that the curriculum for using ${activity} is comprehensive and engaging for learners.
    `;
  }

  function makeCurriculums(activities: string[], grade: string | undefined | null = null, lesson: number = 7): string {
    if (activities.length == 1) {
      return makeCurriculum(activities[0]);
    }

    const activitiesStr = `${activities.slice(0, -1).join(', ')} and ${activities[activities.length - 1]}`

    return `
      Curriculum for ${activitiesStr}:

      Write a curriculum that has the word "educational" somewhere in it with scope and sequence, learning objectives, activity, and assessment for a child wanting to learn about ${activitiesStr}. Please provide a comprehensive list of all materials needed for the ${activitiesStr} curriculum, including the additional products mentioned. For each item, give a detailed explanation of how it is specifically used within the curriculum, including which lessons or activities it's used for and any particular techniques or applications involved. List materials at the end.

      1. Scope and Sequence
      2. Learning Objectives
      3. ${lesson} Detailed Lessons in Order
      4. Activities
      5. Assessment

      Include the brief history of ${activitiesStr}. Provide a summary of materials required at the end and put a short explanation of it next to the material.

      
      Make sure the curriculum is comprehensive and engaging for learners.
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
      <Header messages={messages} submit={submit} buttonRef={buttonRef} />

      {/** Es Tiempo de enviar mensajes (suavemente) */}
      <div className="w-full h-[90vh] flex justify-center">
        <div className="w-[98vw] lg:w-[40vw] lg:h-[90vh] relative flex flex-col px-6 py-2">
          <div className="flex flex-row gap-2 mx-auto lg:mx-0 max-w-[90%] lg:max-w-[94%] xl:max-w-full">
            <ChatHistory setId={setId} id={id} messages={messages} canCreateNew={canCreateNew} />
          </div>
          <ScrollArea className="w-[85vw] mx-auto lg:w-[40vw] flex flex-col gap-10 lg:gap-3 h-[80%] p-2 overflow-auto">
            {messages.length > 0 ? <>
              {
                messages.map((m: Message, index) => (
                  <MessageBubble text={cleanString(m.content)}
                    key={m.id} isUser={m.role === "user"}
                    isReady={index === Object.keys(messages).length - 1 && index % 2 !== 0}
                    handleButtonClick={handleButtonClick} />
                ))
              }
              {
                c && <><MessageBubble
                key={"w"} 
                is={true} /></>
              }
            </> : (
              <SplashScreen submit={submit} />
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
                          <FormLabel>Link/Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter link/title here" {...field} />
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
          <h1 className="text-center text-gray-700 dark:text-white font-semibold text-xs mt-1">Note: This AI uses <Link href="https://llama.meta.com/" className="font-bold">Meta-Llama 3.1</Link> and may make mistakes.</h1>
        </div>
      </div>
    </main>
  );
}