"use client"

import { ArrowUpFromLine, ClipboardCopy, Headphones, Sparkles } from 'lucide-react';
import Markdown from "react-markdown"
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export const MessageBubble = (params: any) => {
    const { toast } = useToast();
    const [cando, setdo] = useState(true);

    const getRidOfMarkDown = (s: string) => {
        return s.replace(/\*\*(.*?)\*\*/g, (match, group1) => group1);
    };

    const speak = () => {
        if ('speechSynthesis' in window) {
            const message = new SpeechSynthesisUtterance();
            message.text = getRidOfMarkDown(params.text);
            message.lang = 'en-US';
            message.volume = 1;
            message.rate = 1;
            message.pitch = 1;
            const voices = speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'));
            if (voice) {
                message.voice = voice;
            } else {
                console.warn('No natural-sounding voice found. Using default voice.');
            }
            speechSynthesis.speak(message);
        } else {
            console.error('SpeechSynthesis not supported.');
        }
    };

    const copy = () => {
        const cleanText = getRidOfMarkDown(params.text);
        navigator.clipboard.writeText(cleanText).then(() => {
            toast({
                title: "Successfully copied!",
                description: "Enjoy using the AI's message!",
            });
        })
            .catch(err => {
                toast({
                    title: "There was an error trying to copy.",
                    description: err.message,
                });
            });
    };

    return (
        <>
            <div className={`bubble dark:text-white my-2 ${params.isUser ? 'user dark:bg-gray-800' : 'ai dark:bg-gray-700'}`}>
                <ScrollArea className='max-w-[300px] h-full overflow-auto'>
                    <Markdown>{params.text}</Markdown>
                </ScrollArea>
                {!params.isUser && (
                    <div className='flex flex-row gap-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button className='!p-0 !bg-transparent !m-0' onClick={copy}>
                                        <ClipboardCopy className='text-gray-600 dark:text-white w-5 h-5' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Copy to Clipboard
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button className='!p-0 !bg-transparent !m-0' onClick={speak}>
                                        <Headphones className='text-gray-600 dark:text-white w-5 h-5' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Speak Aloud
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
            </div>
            {
                params.isReady && cando && <>
                    <div className={`bubble !text-white my-2 bg-gradient-to-r from-blue-600 to-violet-600 relative`}>
                        <ScrollArea className='max-w-[300px] h-full overflow-auto'>
                            <div className='flex flex-row gap-2'>
                                <Sparkles className='w-8 h-8' />
                                <div className='flex flex-col gap-2'>
                                    <p>This curriculum is production-ready.</p>
                                    <div className='w-full flex flex-row gap-2'>
                                        <Button className='w-1/2' variant={'secondary'}
                                            onClick={() => params.handleButtonClick()}
                                        >Export Now</Button>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant={'secondary'}>View Now</Button>
                                            </DialogTrigger>
                                            <DialogContent className="w-[90vw] lg:w-[80vw] rounded-xl pr-5 ">
                                                <DialogHeader className="font-extrabold">
                                                    Curriculum
                                                </DialogHeader>
                                                <ScrollArea className="w-[80vw] lg:w-[78vw] h-[75vh] overflow-hidden relative">
                                                    <div className="whitespace-normal">
                                                        <Markdown>{`${params.text}`}</Markdown>
                                                    </div>
                                                    <div className="absolute bottom-0 right-0 size-2 mr-8 w-10 h-10 grid place-items-center bg-gray-200">
                                                        <Button onClick={() => copy()}><ClipboardCopy /></Button>
                                                    </div>
                                                </ScrollArea>



                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        <span className="motion-safe:animate-ping absolute inline-flex lg:h-8 lg:w-8 h-7 w-7 rounded-full bg-sky-400 opacity-75"></span>
                    </div>

                </>
            }
        </>
    );
};
