"use client"

import * as React from "react"
import { Box, Check, ChevronsUpDown, CircleHelp, CircleOff, Component, Info, Paperclip, Plus, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "./ui/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { generateId, Message } from "ai"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LinkPreview } from "./link-preview"
import { ScrollArea } from "./ui/scroll-area"

const FormSchema = z.object({
  chat: z
    .string({
      required_error: "Please select a chat to display.",
    })
    .email(),
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

function isFORMStorage(data: any): data is FORMStorage {
  return data && typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.desc === 'string' &&
    typeof data.id === 'string';
}

function isLINKStorage(data: any): data is LINKStorage {
  return data && typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.link === 'string' &&
    typeof data.id === 'string';
}

interface Props {
  setId: Function;
  id: string;
  messages: Message[];
  canCreateNew: boolean
}

export default function ChatHistory(props: Props) {
  const { toast } = useToast();
  const [tempId, setTempId] = React.useState<string>(props.id);
  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    props.setId(data.chat);
    setTempId(data.chat);
  }

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [loading, setLoading] = React.useState(true);
  const [canShow, setShow] = React.useState<boolean | undefined>(undefined);
  const [messageData, setMessageData] = React.useState<any>(null);
  const [dat, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const me = localStorage.getItem("messageData");
    if (me) {
      const parsed = JSON.parse(me);
      if (parsed) {
        const filter = (item: any) => {
          return tempId == item.id;
        }

        var filtered = [];
        filtered = parsed.filter(filter);
        setData(filtered[0] || null)
      }
    }
  }, [props.id, tempId]);

  function doStuff() {
    const i = generateId();
    form.reset({
      chat: i
    });
    setTimeout(() => {
      props.setId(i);
      localStorage.setItem("currentChatId", i);
    }, 200);
  }

  React.useEffect(() => {
    const d = localStorage.getItem("messageData");
    if (d) {
      const parsed = JSON.parse(d);
      setMessageData(parsed);
    }

    if (typeof window !== undefined && localStorage.getItem("enabledHistory"))
      setShow(true);
    else
      setShow(false);
  }, [props.canCreateNew])

  function formatTitles(input: string): string {
    // First, we replace all the unnecessary characters: brackets, braces, and quotes
    const cleaned = input.replace(/[\{\}\"\\]/g, '');

    // Then, we replace the ": " and ":\" to commas for a list of titles
    const formatted = cleaned.replace(/titles:/g, '').split(',').join(', ');

    return formatted;
  }

  if (canShow == undefined)
    return null;
  else if (!canShow) {
    return <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"outline"} className="mx-1 px-3 flex flex-row gap-1 "><ShieldCheck /> Enable History</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-xl mx:2 lg:mx-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Would you like to enable History?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col w-full h-full gap-1">
                <p className="leading-7">
                  History gives you access to up to 20 previous conversations.
                </p>
                <p className="leading-7">
                  By enabling the history feature, you agree to:
                </p>
                <ul className="list-disc">
                  <li className="ml-10">Our privacy overview</li>
                  <li className="ml-10">Searching for chats based on product(s)</li>
                  <li className="ml-10">Storing chat data for future reference</li>
                  <li className="ml-10">Being able to opt out at any time</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => localStorage.setItem("enabledHistory", "true")}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  }

  return <>
    <Button variant={"outline"} className="mx-1 px-3 flex flex-row gap-1 "
      onClick={() => doStuff()}>
      <Plus /> New <span className="hidden lg:block">Product</span>
    </Button>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
        <FormField
          control={form.control}
          name="chat"
          render={({ field }) => (
            <FormField
              control={form.control}
              name="chat"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onSubmit({ chat: value });
                    }}
                    value={field.value} // Ensure the Select value is controlled by the form
                  >
                    <FormControl>
                      <SelectTrigger className="w-[160px] lg:w-full">
                        <SelectValue placeholder="Select a chat to display" className="w-[100px] lg:w-[200px]" />
                      </SelectTrigger>
                    </FormControl>
                    <ScrollArea className="max-h-[250px]">
                      <SelectContent>
                        {messageData && Object.keys(messageData).length > 0 ? (
                          Object.keys(messageData).map((key: string | number, index: any) => (
                            <Item key={index} data={messageData[key]} />
                          ))
                        ) : (
                          <div className="grid place-items-center w-[240px] xl:w-full px-10 py-5 h-full">
                            <div className="flex flex-col gap-2 items-center text-center justify-center">
                              <CircleOff className="w-10 h-10" />
                              <p className="text-sm">Whoops, it looks like nothing is in your history.</p>
                              <p className="text-xs">
                                <span className="font-bold">Note:</span> The history will only update upon a page reload.
                              </p>
                            </div>
                          </div>
                        )}
                      </SelectContent>
                    </ScrollArea>
                  </Select>
                </FormItem>
              )}
            />

          )}
        />
      </form>
    </Form>
    <Popover>
      <PopoverTrigger>
        <Button variant={"outline"} className="mb-2"><Info /></Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-max gap-1">
        {dat ? <>
          {
            'titles' == dat.type ? <>
              <div className="w-[90vw] lg:w-[450px] bg-white dark:bg-gray-950 p-3 flex flex-col gap-2">
                <div className="flex flex-row gap-2 w-full">
                  <h1 className="flex flex-row gap-1">
                    <Component />Products:
                  </h1>
                  {formatTitles(dat.extra)}
                </div>
              </div>
            </> : 'link' == dat.type ? <>
              <div className="w-[90vw] lg:w-[450px] bg-white dark:bg-gray-950 p-3 flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <Box className="my-auto w-8 h-8" />
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-auto text-right">
                    Product:
                  </h4>
                  <p className="text-sm my-auto text-right">
                    {dat ? dat.name : 'No data available'}
                  </p>
                </div>
                <div className="flex flex-row gap-2">
                  <Paperclip className="my-auto transform rotate-[-45deg] w-8 h-8 flex-shrink-0" />
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-auto">
                    Link:
                  </h4>
                  <p className="my-auto text-right font-semibold overflow-hidden">
                    <LinkPreview url={dat.extra} className="text-blue-500 text-sm truncate my-auto">
                      <p className="truncate max-w-[500px]">{dat.extra}</p>
                    </LinkPreview>
                  </p>
                </div>
              </div>
            </> : <>
              <div className="flex flex-row gap-2">
                <Box className="my-auto" />
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-auto">
                  Product:
                </h4>
                <p className="text-sm my-auto text-right">
                  {dat ? dat.name : 'No data available'}
                </p>
              </div>
            </>
          }
        </> : <>
          <div className="w-full h-[150px] grid place-items-center">
            <div className="flex flex-col gap-1 justify-center items-center text-center w-[80%]">
              <CircleHelp /> {tempId}
              <p className="font-semibold">Hmm, there does not seem to be anything selected.</p>
            </div>
          </div>
        </>}
      </PopoverContent>
    </Popover>
  </>
}

function Item(params: any) {
  function capitalizeFirstLetter(string: string = " ") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return <>
    <SelectItem value={params.data?.id || "unknown"} className="w-full max-w-[250px] lg:max-w-full flex flex-row gap-2">
      <p>{params.data.name || "Collection of " + params.data.titles.length || ""}</p>
      <Badge>{capitalizeFirstLetter(params.data.type)}</Badge>
    </SelectItem>
  </>
}
