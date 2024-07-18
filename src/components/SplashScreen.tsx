"use client"
import { useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface RecommendationProps {
    message: string;
    type: string;
}

export default function SplashScreen() {

    const [isSpinning, setIsSpinning] = useState(false);
    const handleClick = () => {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 500);
    };

    return (
        <div className="h-[66vh] flex flex-col !overflow-hidden px-auto w-[85vw] lg:w-[35vw]">
            <div className="w-full h-[75%] flex flex-col text-center ">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Create-A-Curriculum
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                Our AI-driven approach revolutionizes education. Enter a product, and receive a comprehensive, tailored curriculum fit to your needs.
                </p>
            </div>
            <div className="w-full h-[25%] flex flex-row gap-3 justify-center p-2">
                <div className="w-[95%] h-full flex flex-row gap-2">
                    <Reccomendation message="Create a Cooking curriculum" type="idea" />
                    <Reccomendation message="Pancake Maker Curriculum" type="idea" />
                </div>
                <div className="w-[5%] h-full flex mt-auto flex-row">
                    <Button className="!p-0 mt-auto !bg-transparent !text-black" onClick={handleClick}>
                        <RefreshCcw className={isSpinning ? 'spin' : ''} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Reccomendation({ message, type }: RecommendationProps) {
    return (
        <div className="w-1/2 h-full flex flex-row bg-slate-200 dark:bg-slate-600 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg p-3 cursor-pointer font-semibold">
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
