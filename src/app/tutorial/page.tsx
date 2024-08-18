"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


enum AI {
    ChatGPT,
    Claude,
    Gemini
}

enum OS {
    iOS,
    Android,
    Web
}

export default function TutorialPage() {
    const [ai, selAi] = useState<AI>(AI.ChatGPT);
    const [device, setDevice] = useState<OS>(OS.Web);

    useEffect(() => {
        const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
        if (/android/i.test(userAgent)) {
            setDevice(OS.Android);
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
            setDevice(OS.iOS);
        } else {
            setDevice(OS.Web);
        }
    }, [])

    const getDevice = () => {
        if (device == OS.Android)
            return "Android"
        else if (device == OS.iOS)
            return "iOS"
        else
            return "Web"
    }

    return <>
        <main className="w-screen h-screen grid place-items-center overflow-x-hidden">
            <div className="size-[90%] lg:size-[80%] mb-6">
                <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                    How To Use AI To Make Curriculums
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-2">
                    A guide made by <Link href={"https://create-a-curriculum.vercel.app/"} className="text-blue-600 font-semibold">create-a-curriculum.vercel.app</Link>.
                </p>
                <div className="w-full h-max flex flex-col lg:flex-row gap-10 my-5 mb-10">
                    <div className="lg:w-1/2 w-full flex flex-row gap-2 ">
                        <div
                            style={
                                {
                                    backgroundColor: ai == AI.ChatGPT ? "#d3d0cf" : "#FFFFFF"
                                }
                            }
                            onClick={() => selAi(AI.ChatGPT)}
                            className="p-5 grid place-items-center border flex-1 mx-2 rounded-2xl cursor-pointer transition-all">
                            <div className="items-center flex flex-col">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 11.134766 1.0175781 C 10.87173 1.0049844 10.606766 1.0088281 10.337891 1.0332031 C 8.1135321 1.2338971 6.3362243 2.7940749 5.609375 4.8203125 C 3.8970488 5.1768339 2.4372723 6.3048522 1.671875 7.9570312 C 0.73398779 9.9840533 1.1972842 12.30076 2.5878906 13.943359 C 2.0402591 15.605222 2.2856216 17.434472 3.3320312 18.921875 C 4.6182099 20.747762 6.8565685 21.504693 8.9746094 21.121094 C 10.139659 22.427613 11.84756 23.130452 13.662109 22.966797 C 15.886521 22.766098 17.663809 21.205995 18.390625 19.179688 C 20.102972 18.823145 21.563838 17.695991 22.330078 16.042969 C 23.268167 14.016272 22.805368 11.697142 21.414062 10.054688 C 21.960697 8.3934373 21.713894 6.5648387 20.667969 5.078125 C 19.38179 3.2522378 17.143432 2.4953068 15.025391 2.8789062 C 14.032975 1.7660011 12.646869 1.0899755 11.134766 1.0175781 z M 11.025391 2.5136719 C 11.921917 2.5488523 12.754993 2.8745885 13.431641 3.421875 C 13.318579 3.4779175 13.200103 3.5164101 13.089844 3.5800781 L 9.0761719 5.8964844 C 8.7701719 6.0724844 8.5801719 6.3989531 8.5761719 6.7519531 L 8.5175781 12.238281 L 6.75 11.189453 L 6.75 6.7851562 C 6.75 4.6491563 8.3075938 2.74225 10.433594 2.53125 C 10.632969 2.5115 10.83048 2.5060234 11.025391 2.5136719 z M 16.125 4.2558594 C 17.398584 4.263418 18.639844 4.8251563 19.417969 5.9101562 C 20.070858 6.819587 20.310242 7.9019929 20.146484 8.9472656 C 20.041416 8.8773528 19.948163 8.794144 19.837891 8.7304688 L 15.826172 6.4140625 C 15.520172 6.2380625 15.143937 6.2352031 14.835938 6.4082031 L 10.052734 9.1035156 L 10.076172 7.0488281 L 13.890625 4.8476562 C 14.584375 4.4471562 15.36085 4.2513242 16.125 4.2558594 z M 5.2832031 6.4726562 C 5.2752078 6.5985272 5.25 6.7203978 5.25 6.8476562 L 5.25 11.480469 C 5.25 11.833469 5.4362344 12.159844 5.7402344 12.339844 L 10.464844 15.136719 L 8.6738281 16.142578 L 4.859375 13.939453 C 3.009375 12.871453 2.1365781 10.567094 3.0175781 8.6210938 C 3.4795583 7.6006836 4.2963697 6.8535791 5.2832031 6.4726562 z M 15.326172 7.8574219 L 19.140625 10.060547 C 20.990625 11.128547 21.865375 13.432906 20.984375 15.378906 C 20.522287 16.399554 19.703941 17.146507 18.716797 17.527344 C 18.724764 17.401695 18.75 17.279375 18.75 17.152344 L 18.75 12.521484 C 18.75 12.167484 18.563766 11.840156 18.259766 11.660156 L 13.535156 8.8632812 L 15.326172 7.8574219 z M 12.025391 9.7109375 L 13.994141 10.878906 L 13.966797 13.167969 L 11.974609 14.287109 L 10.005859 13.121094 L 10.03125 10.832031 L 12.025391 9.7109375 z M 15.482422 11.761719 L 17.25 12.810547 L 17.25 17.214844 C 17.25 19.350844 15.692406 21.25775 13.566406 21.46875 C 12.449968 21.579344 11.392114 21.244395 10.568359 20.578125 C 10.681421 20.522082 10.799897 20.48359 10.910156 20.419922 L 14.923828 18.103516 C 15.229828 17.927516 15.419828 17.601047 15.423828 17.248047 L 15.482422 11.761719 z M 13.947266 14.896484 L 13.923828 16.951172 L 10.109375 19.152344 C 8.259375 20.220344 5.8270313 19.825844 4.5820312 18.089844 C 3.9291425 17.180413 3.6897576 16.098007 3.8535156 15.052734 C 3.9587303 15.122795 4.0516754 15.205719 4.1621094 15.269531 L 8.1738281 17.585938 C 8.4798281 17.761938 8.8560625 17.764797 9.1640625 17.591797 L 13.947266 14.896484 z" /></svg>
                                <p className="mt-auto">ChatGPT</p>
                            </div>
                        </div>
                        <div
                            style={
                                {
                                    backgroundColor: ai == AI.Claude ? "#d3d0cf" : "#FFFFFF"
                                }
                            }
                            onClick={() => selAi(AI.Claude)}
                            className="p-5 grid place-items-center border flex-1 mx-2 rounded-2xl cursor-pointer transition-all">
                            <div className="items-center flex flex-col">
                                <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 490 490"><path fill="#1F1F1E" fill-rule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z" /></svg>
                                <p className="mt-auto">Claude</p>
                            </div>
                        </div>
                        <div
                            style={
                                {
                                    backgroundColor: ai == AI.Gemini ? "#d3d0cf" : "#FFFFFF"
                                }
                            }
                            onClick={() => selAi(AI.Gemini)}
                            className="p-5 grid place-items-center border flex-1 mx-2 rounded-2xl cursor-pointer transition-all">
                            <div className="items-center flex flex-col">
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)" /><defs><radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"><stop offset=".067" stop-color="#9168C0" /><stop offset=".343" stop-color="#5684D1" /><stop offset=".672" stop-color="#1BA1E3" /></radialGradient></defs></svg>
                                <p className="mt-auto">Gemini</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 text-center lg:text-right">
                        Choose your preferred AI provider. If you{"'"}re unsure, ChatGPT is a great choice. Scroll down to continue when ready. Please note: <span className="font-semibold">This guide is independently created and not endorsed by the companies mentioned.</span>
                    </div>
                </div>
                {
                    ai == AI.ChatGPT ? <ChatGPT device={device} /> : ai == AI.Claude ? <Claude device={device} /> : <Gemini device={device} />
                }
                <Link href={"https://forms.gle/eCGixYxjtVYJ4QK99"} className="text-blue-500 font-semibold text-center pb-10">Reccomendation Form</Link>
            </div>
        </main>
    </>
}

function Section({
    Child1,
    Child2
}: {
    Child1: any,
    Child2: any
}) {
    return <>
        <div className="w-full h-max flex flex-col lg:flex-row gap-10 lg:gap-2">
            <div className="w-full lg:w-1/2">
                {Child1}
            </div>
            <div className="w-full lg:w-1/2">
                {Child2}
            </div>
        </div>
    </>
}

function MakeAPrompt() {
    return <>
        <Section
            Child1={
                <>
                    <Image src={"/guide/ChatGPT/5.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                </>
            }
            Child2={
                <>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Creating a Prompt for Your Product
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        You can create a prompt based off a product at:
                    </p>
                    <ul className="ml-8 list-disc">
                        <li>Visit:  <Link href={"https://create-a-curriculum.vercel.app/prompt"} className="text-blue-500 font-semibold" target="_blank">create-a-curriculum.vercel.app/prompt</Link></li>
                        <li>Enter your product details.</li>
                        <li>Press {"'"}Copy{"'"}</li>
                        <li>Return to the AI.</li>
                    </ul>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        Input your product, press the copy button, and go back to the AI.
                    </p>
                </>
            } />
    </>
}

function ChatGPT({
    device
}: {
    device: OS
}) {
    return <>
        <div className="flex flex-col gap-16 w-full pb-16">
            <Section
                Child1={
                    <>
                        <Image src={"/guide/ChatGPT/1.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                    </>
                }
                Child2={
                    <>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Accessing the Site
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            You can access ChatGPT in two ways:
                        </p>
                        <ul className="list-disc ml-4">
                            <li>Through the site link: <Link href={"https://chatgpt.com/"} className="text-blue-500 font-semibold">ChatGPT</Link></li>
                            <li>Through the App Store:
                                <Link href={
                                    device == OS.iOS ? "https://apps.apple.com/us/app/chatgpt/id6448311069" : "https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=en_US"
                                } className="text-blue-500 font-semibold"> App Here</Link>
                            </li>
                            <li>Mac  & (Windows is coming later) are avaliable as apps</li>
                        </ul>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            Press the Login or Signup button to begin the process.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            For more, refer to <Link href={"https://openai.com/chatgpt/download/"} className="text-blue-500 font-semibold">https://openai.com/chatgpt/download/</Link>
                        </p>
                    </>
                } />
            <Section
                Child1={
                    <>
                        <Image src={"/guide/ChatGPT/2.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                    </>
                }
                Child2={
                    <>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Making An Account
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            You can make an account by clicking Sign Up and following these options below or login.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            You can use four methods:
                        </p>
                        <ul className="list-disc ml-4">
                            <li>Log In/Sign Up with Email</li>
                            <li>Log In/Sign Up with Google</li>
                            <li>Log In/Sign Up with Microsoft</li>
                            <li>Log In/Sign Up with Apple</li>
                        </ul>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            <span className="font-bold">Note</span>: It may ask you to provide a phone number. This is to prevent bots from sending spam messages to ChatGPT.
                        </p>
                    </>
                } />
            <Section
                Child1={
                    <>
                        <Carousel className="w-[90%]">
                            <CarouselContent>
                                <CarouselItem>
                                    <Image src={"/guide/ChatGPT/3.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                                </CarouselItem>
                                <CarouselItem>
                                    <Image src={"/guide/ChatGPT/4.png"} alt={""} width={500} height={400} className="rounded-2xl my-auto" />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </>
                }
                Child2={
                    <>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            How to Use ChatGPT
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            Here is a basic overview of how to use ChatGPT and the different abilities it has.
                        </p>
                        <ul className="list-decimal ml-8">
                            <li><span className="font-semibold">Typing</span>: Simply type your message to the AI.</li>
                            <li><span className="font-semibold">Submit</span>: Press the button to send your message.</li>
                        </ul>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            You don’t need a specific format—just type as if you’re having a conversation with a person. The AI will respond to whatever you write. Yes, <span className="font-bold">whatever you write</span>.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            Find out the format to make a quick prompt for your product below:
                        </p>
                    </>
                } />
            <MakeAPrompt />
            <Section
                Child1={
                    <>
                        <Image src={"/guide/ChatGPT/6.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                    </>
                }
                Child2={
                    <>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Inputting
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            Go over to the textbox where you enter your message. Then, you can enter the output of the prompt generator, and then press the button with the arrow that goes up. <span className="font-semibold">(See Photo Above)</span>
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            Enjoy your curriculum.
                        </p>
                    </>
                } />
            <Section
                Child1={
                    <>
                        <Image src={"/guide/ChatGPT/7.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                    </>
                }
                Child2={
                    <>
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Extra
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            After a while, you might see this message, saying that your &quot;free plan&quot; ran out. Do not worry, because you can still use ChatGPT.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            In the app/site of ChatGPT, there are two models, GPT-4o and GPT-4o Mini. 4o is the better model, and is automatically used; however, it does have an limit. Once you reach that limit, it will give you this message (Look at Photo) and after around 3-5 ish hours, you will be able to use it again.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            In the meantime, you are still able to use ChatGPT, however, the model will be switched to GPT-4o Mini (the Free Model).
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                            If it locks you out of the chat, start a new chat (see photo above). This should fix the problem.
                        </p>
                    </>
                } />
        </div>
    </>
}

function Claude({
    device
}: {
    device: OS
}) {
    return <>
        <div className="flex flex-col gap-16 w-full pb-16">
            <Section Child1={
                <>
                    <Image src="/guide/Claude/1.png" alt={""} width={500} height={400} className="rounded-2xl" />
                </>
            } Child2={
                <>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Logging In
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        You can access Claude in two ways:
                    </p>
                    <ul className="list-disc ml-4">
                        <li>Through the site link: <Link href={"https://claude.ai/"} className="text-blue-500 font-semibold">Claude</Link></li>
                        <li>Through the App Store:
                            <Link href={
                                device == OS.iOS ? "https://apps.apple.com/us/app/claude-by-anthropic/id6473753684" : "https://play.google.com/store/apps/details?id=com.anthropic.claude&hl=en_US"
                            } className="text-blue-500 font-semibold"> App Here</Link>
                        </li>
                    </ul>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        Press the Continue with Email or Continue with Google and follow the prompts there in order to use Claude.
                    </p>
                </>
            } />

            <Section Child1={
                <>
                    <Carousel className="w-[90%]">
                        <CarouselContent>
                            <CarouselItem>
                                <Image src={"/guide/Claude/2.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                            </CarouselItem>
                            <CarouselItem>
                                <Image src={"/guide/Claude/3.png"} alt={""} width={500} height={400} className="rounded-2xl my-auto" />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </>
            } Child2={
                <>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Introduction
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        Here is a basic diagram for how to navigate Claude.
                    </p>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        Type your message into the textbox, and then press the button to submit.
                    </p>
                    <ul className="ml-8 mt-8 list-decimal">
                        <li><strong>Typing:</strong> Type your message to Claude.</li>
                        <li><strong>Submit:</strong> Press the button to send your message.</li>
                    </ul>
                    <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                        No specific format is needed—just type naturally as you would in a conversation. Claude will respond to whatever you write.
                    </p>
                </>
            } />
            <MakeAPrompt />
            <Section Child1={<>
                <Image src={"/guide/Claude/4.png"} alt={""} width={500} height={400} className="rounded-2xl" />
            </>} Child2={<>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Inputting
                </h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Go to the textbox where you enter your message. Then, input the output from the prompt generator, and press the button with the upward arrow. <span className="font-semibold">(See Photo Above)</span>
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Enjoy using Claude!
                </p>
            </>} />
        </div>
    </>
}

function Gemini({
    device
}: {
    device: OS
}) {
    return <>
        <Section Child1={
            <>
                <Image src="/guide/Gemini/1.png" alt={""} width={500} height={400} className="rounded-2xl" />
            </>
        } Child2={
            <>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Logging In
                </h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    You can access Google Gemini in two ways:
                </p>

                <ul className="list-disc ml-4">
                    <li>Through the site link: <Link href={"https://gemini.google.com/"} className="text-blue-500 font-semibold">Gemini</Link></li>
                    <li>Through the App Store:
                        <Link href={
                            device == OS.iOS ? "https://apps.apple.com/us/app/google/id284815942" : "https://play.google.com/store/apps/details?id=com.google.android.apps.bard&hl=en_US"
                        } className="text-blue-500 font-semibold"> App Here</Link>
                    </li>
                </ul>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    For <Link href={"https://gemini.google.com/app/download"} className="text-blue-500 font-semibold">More</Link>
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Press &quot;Sign In&quot; and follow the prompts to use Google Gemini.
                </p>
            </>
        } />
        <Section Child1={
            <>
                <Carousel className="w-[90%]">
                    <CarouselContent>
                        <CarouselItem>
                            <Image src={"/guide/Gemini/2.png"} alt={""} width={500} height={400} className="rounded-2xl" />
                        </CarouselItem>
                        <CarouselItem>
                            <Image src={"/guide/Gemini/3.png"} alt={""} width={500} height={400} className="rounded-2xl my-auto" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </>
        } Child2={
            <>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Introduction
                </h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Here is a basic diagram for how to navigate Claude.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Type your message into the textbox, and then press the button to submit.
                </p>
                <ul className="ml-8 mt-8 list-decimal">
                    <li><strong>Typing:</strong> Type your message to Claude.</li>
                    <li><strong>Submit:</strong> Press the button to send your message.</li>
                </ul>
                <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    No specific format is needed—just type naturally as you would in a conversation. Claude will respond to whatever you write.
                </p>
            </>
        } />
        <MakeAPrompt />
        <Section Child1={<>
            <Image src={"/guide/Gemini/4.png"} alt={""} width={500} height={400} className="rounded-2xl" />
        </>} Child2={<>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Inputting
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                Go to the textbox where you enter your message. Then, input the output from the prompt generator, and press the button with the right arrow near the end. <span className="font-semibold">(See Photo Above)</span>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                Enjoy using Gemini!
            </p>
        </>} />
    </>
}