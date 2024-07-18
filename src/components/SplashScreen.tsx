import { Sparkles } from "lucide-react";

export default function SplashScreen() {
    return <>
        <div className="w-full h-[75%] ">
            Hello
        </div>
        <div className="w-full h-[25%] flex flex-row gap-3 justify-center p-2">
            <Reccomendation message="Create a Cooking curriculum"/>
            <Reccomendation message="Pancake Maker Curriculum"/>
        </div>
    </>
}

function Reccomendation(params: any) {
    return <>
        <div className="w-1/2 h-full flex-col flex bg-slate-200 rounded-lg p-3 cursor-pointer font-semibold">
            <div className="w-full h-full">
                {params.message}
            </div>
            <div>
                <Sparkles className="w-5 h-5 text-gray-600"/>
            </div>
        </div>
    </>
}