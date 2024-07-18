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
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplashScreen from "@/components/SplashScreen";
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageBubble } from "@/components/ChatBubble";

const messages: string[] = [
  "**Hello** Hello",
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
];

export default function Home() {

  const [able, setAble] = useState(false);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header />

      {/** Es Tiempo de enviar mensajes (suavemente) */}
      <div className="w-full h-full flex justify-center">
        <div className="w-full lg:w-[40vw] max-h-[90vh] relative flex flex-col p-6 gap-2">
          <ScrollArea className="w-full mx-auto lg:w-[38vw] flex flex-col gap-1 h-[80%] p-2">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className={`w-full flex justify-${index % 2 !== 0 ? "end" : "start"}`}>
                  <MessageBubble isUser={index % 2 !== 0} text={message} />
                </div>
              ))
            ) : (
              <SplashScreen />
            )}
          </ScrollArea>
          <div className="w-full h-[12%] bg-slate-300 rounded-full flex flex-row gap-3 items-center px-5">
            <Input placeholder={able ? "Enter Message Here.." : "Fill out form fully.."} className="!bg-transparent !border-0 w-full text-1xl" disabled={!able} />
            <Button className="p-0 !bg-transparent !text-black" disabled={!able}><Send /></Button>
          </div>
          <h1 className="text-center text-gray-700 font-semibold">Note: AI is not always perfect. Check the validity before using.</h1>
        </div>
      </div>
    </main>
  );
}
