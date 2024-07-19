import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { FileText, Text, ClipboardCopy } from "lucide-react";
import { SVGProps } from "react";

interface BigButtonProps {
    text: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    callback?: () => void; // Optional callback function
}

export default function Export() {
    const handleExportPDF = () => {
        console.log("Export to PDF clicked");
        // Add PDF export logic here
    };

    const handleExportText = () => {
        console.log("Export to Text clicked");
        // Add Text export logic here
    };

    const handleCopy = () => {
        console.log("Copy clicked");
        // Add Copy logic here
    };

    return (
        <>
            <div className="flex flex-col h-[85%] gap-5 py-2">
                <div className=" w-full h-[30%] gap-1.5">
                    <Label htmlFor="message">Your information</Label>
                    <Textarea placeholder="Type your message here." id="message" className="h-[98%]" />
                </div>
                <div className=" w-full h-[50%] gap-1.5">
                    <Label htmlFor="message">Your curriculum</Label>
                    <Textarea placeholder="Type your message here." id="message" readOnly className="h-[98%]" />
                </div>
                <div className="w-full h-[20%] flex flex-row gap-2">
                    <BigButton text="Export to .PDF" icon={FileText} callback={handleExportPDF} />
                    <BigButton text="Export to .DOC" icon={Text} callback={handleExportText} />
                    <BigButton text="Copy" icon={ClipboardCopy} callback={handleCopy} />
                </div>
            </div>
        </>
    );
}

function BigButton({ text, icon: Icon, callback }: BigButtonProps) {
    return (
        <Button className="w-1/3 h-max flex flex-col items-center justify-center my-auto gap-1 py-2" onClick={callback}>
            <Icon className="w-6 h-6" /> {/* Adjust icon size as needed */}
            <p>{text}</p>
        </Button>
    );
}