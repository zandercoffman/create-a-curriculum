import { ClipboardCopy, Headphones } from 'lucide-react';
import Markdown from 'react-markdown'
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

export const MessageBubble = (params: any) => {
    const { toast } = useToast()

    const getRidOfMarkDown = (s: string) => {
        return s.replace(/\*\*(.*?)\*\*/g, (match, group1) => group1);
    }

    const speak = () => {
        // Check if SpeechSynthesis is available in the browser
        if ('speechSynthesis' in window) {
            // Create a new SpeechSynthesisUtterance instance
            const message = new SpeechSynthesisUtterance();
            message.text = getRidOfMarkDown(params.text);

            // Optionally set speech synthesis parameters
            message.lang = 'en-US';  // Language and locale
            message.volume = 1;       // Volume (0 to 1)
            message.rate = 1;         // Speech rate (0.1 to 10)
            message.pitch = 1;        // Speech pitch (0 to 2)

            // Get the list of voices available
            const voices = speechSynthesis.getVoices();

            // Filter for voices that match the language and are natural-sounding
            const voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google'));

            // Set the voice for more natural speech
            if (voice) {
                message.voice = voice;
            } else {
                console.warn('No natural-sounding voice found. Using default voice.');
            }

            // Speak the text
            speechSynthesis.speak(message);
        } else {
            console.error('SpeechSynthesis not supported.');
        }

    }

    const copy = () => {
        const cleanText = getRidOfMarkDown(params.text);
        navigator.clipboard.writeText(cleanText).then(() => {
            console.log('Text copied to clipboard successfully');
            toast({
                title: "Successfully copied!",
                description: "Enjoy using the AI's message!",
            })
        })
            .catch(err => {
                toast({
                    title: "There was an error trying to copy.",
                    description: err.message,
                })
            });

    }

    return (
        <div className={`bubble ${params.isUser ? 'user' : 'ai'}`}>
            <Markdown>{params.text}</Markdown>
            {!params.isUser && <>
                <div className='flex flex-row gap-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Button className='!p-0 !bg-transparent !m-0' onClick={copy}><ClipboardCopy className='text-gray-600 w-5 h-5' /></Button></TooltipTrigger>
                            <TooltipContent>
                                Copy to Clipboard
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Button className='!p-0 !bg-transparent !m-0' onClick={speak}><Headphones className='text-gray-600 w-5 h-5' /></Button></TooltipTrigger>
                            <TooltipContent>
                                Speak Aloud
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </>}
        </div>
    );
};