import { FlexContainer } from "@/components/flex-container";

export default function PromptPage() {
    return <>
        <div className="w-screen h-[95vh] p-20 grid place-items-center  overflow-hidden">
            <div className="flex flex-col items-center">
                <span className="text-center font-semibold">Choose a prompt generator...</span>
                <FlexContainer />
            </div>
        </div>
    </>
}