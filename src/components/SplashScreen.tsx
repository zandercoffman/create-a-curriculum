"use client"
import { useState } from "react";
import { Sparkles, RefreshCcw, PanelRight, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { educationalItems } from "@/lib/educItems";

interface RecommendationProps {
    message: string;
    type: string;
    onClick: Function;
}

interface FORM2PRODUCT {
    name: string;
    description: string;
  }

  const getRandomItem = (items: string[]): string => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
};
  
  console.log(educationalItems);
  
  interface Props {
    submit: Function;
  }

export default function SplashScreen(props: Props) {

    const [isSpinning, setIsSpinning] = useState(false);
    const handleClick = () => {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 500);
        
        setRan1(getRandomItem(educationalItems))
        setRan2(getRandomItem(educationalItems))
    };

    const [randomItem1, setRan1] = useState<string>(getRandomItem(educationalItems))
    const [randomItem2, setRan2] = useState<string>(getRandomItem(educationalItems));

    const sub1 = () => {
        props.submit({name: randomItem1, description: `A product about ${randomItem1}`} satisfies FORM2PRODUCT)
    }
    const sub2 = () => {
        props.submit({name: randomItem2, description: `A product about ${randomItem2}`} satisfies FORM2PRODUCT)
    }

    return (
        <div className="h-[66vh] flex flex-col !overflow-hidden px-auto w-[85vw] lg:w-[35vw]">
            <div className="w-full h-[75%] flex flex-col text-center lg:text-left ">
                <h1 className="dark:!text-white gradient-text text-3xl lg:text-5xl">
                    Create-A-Curriculum
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Our AI-driven approach revolutionizes education. Enter a product, and receive a comprehensive, tailored curriculum fit to your needs. All for <span className="font-bold">$0.00</span>.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    You can generate a curriculum in two ways:
                </p>
                <div className="w-full flex items-center gap-2 mt-2 overflow-x-auto leading-3">
                    <p className="flex flex-row gap-2 text-sm lg:text-base whitespace-nowrap">
                        <span className="font-bold">1.</span> Press the <PanelRight className="transform rotate-180" /> button, fill out the form, and press Submit.
                    </p>
                </div>
                <div className="w-full flex items-center gap-2 mt-2 overflow-x-auto leading-3">
                    <p className="flex flex-row gap-2 text-sm lg:text-base whitespace-nowrap">
                        <span className="font-bold">2.</span> Press the <Paperclip className="transform rotate-[-45deg]" /> button, enter a link, then generate.
                    </p>
                </div>

            </div>
            <div className="w-[80vw] lg:w-full h-[25%] flex flex-row gap-3 justify-center p-2">
                <div className="w-[95%] h-full flex flex-row gap-2">
                    <Reccomendation message={`Create a ${randomItem1} curriculum`} type="idea" onClick={sub1}/>
                    <Reccomendation message={`${randomItem2} curriculum`} type="idea" onClick={sub2} />
                </div>
                <div className="w-[5%] h-full flex mt-auto flex-row">
                    <Button className="!p-0 mt-auto !bg-transparent text-black dark:text-white" onClick={handleClick}>
                        <RefreshCcw className={isSpinning ? 'animate-spin' : ''} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Reccomendation({ message, type, onClick }: RecommendationProps) {
    return (
        <div className="w-1/2 h-full flex flex-row bg-slate-200 dark:bg-slate-600 
        transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg p-3 
        cursor-pointer font-semibold" onClick={() => onClick()}>
            <div className="flex-grow">
                <h4 className="scroll-m-20 text-l font-semibold tracking-tight">
                    {type === "idea" ? "Curriculum Idea:" : ""}
                </h4>
                <p className="leading-4 font-normal text-sm">
                    {message}
                </p>
            </div>
            <div className="flex justify-end mt-auto">
                <Sparkles className="w-5 h-5 text-gray-600 dark:text-white" />
            </div>
        </div>
    );
}
