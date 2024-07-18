"use client"
import Header from "@/components/Header";
import Image from "next/image";
import {useState} from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



export default function Home() {

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Header />
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        <div className="flex p-4 w-auto h-full flex-col">
          <h2 className="text-2xl font-bold mb-4">AI Chatbot</h2>
          {/* Placeholder content, replace with your AI chatbot component */}
          <div className="border border-gray-300 rounded-lg p-4">
            {/* Your AI chatbot component can go here */}
            <p>This is where your AI chatbot will interact with the user.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
