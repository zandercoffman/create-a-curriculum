import { ArrowUpFromLine, ClipboardCopy, Headphones, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from './ui/scroll-area';

export const MessageBubble = (params: any) => {
    const { toast } = useToast();

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
        <div className={`bubble dark:text-white my-2 ${params.isUser ? 'user dark:bg-gray-800' : 'ai dark:bg-gray-700'}`}>
            <ScrollArea className='max-w-[300px] h-full overflow-auto'>
                <Markdown>{params.text}</Markdown>
            </ScrollArea>
            {!params.isUser && (
                <div className='flex flex-row gap-2'>
                    {
                        params.isLast && <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button className='!p-0 !bg-transparent !m-0' onClick={copy}>
                                        <ArrowUpFromLine className='dark:text-white text-[#050505] w-6 h-6 my-auto ' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Export This
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }
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
    );
};
