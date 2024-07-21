"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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

export default function ChatHistory() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [loading, setLoading] = React.useState(true);
  const [canShow, setShow] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem("enabledHistory"))
      setShow(true);
    else
      setShow(false);

  }, [])

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
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  }

  return <>
    <Button variant={"outline"} className="mx-1 px-3 flex flex-row gap-1 "><Plus /> New Product</Button>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] flex mx-auto lg:mx-0 mb-0"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Product Chat History"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandEmpty>No chat found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </>
}