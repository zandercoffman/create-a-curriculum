import { Info } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"



export default function PrivacyPopup() {
    return <>
        <Dialog>
            <DialogTrigger className="font-bold text-blue-500">privacy overview</DialogTrigger>
            <DialogContent className="w-[86vw] lg:w-[70vw] h-[90vh] lg:h-[60vh] my-3 lg:my-0 !rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Privacy Overview</DialogTitle>
                    <DialogDescription>
                        Privacy? That&apos;s our motto. In making this application, AI has always been a prominent key to delivering access to the community. In development, there are rules that I am following to ensure every user&apos;s security.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="w-full h-full overflow-auto">
                    <div className="flex flex-col gap-8 w-full justify-start mb-auto h-full pr-4 lg:pr-2">

                        <Rule
                            title="Your information remains private and secure."
                            desc="The AI is provided solely with your product name, description, and number of lessons. Your personal information is managed separately, ensuring that models do not use it for training purposes."
                            index={1}
                            tldr="Only your product info is shared with the AI; your personal data is kept separate and private."
                        />

                        <Rule
                            title="Your information is not stored by default."
                            desc="Any details you provide are used solely for the current session and are not saved afterward. Features like history and storing information are managed by you, ensuring your data remains transient and unarchived."
                            index={2}
                            tldr="Your data is used only for the current session and is not stored permanently by default. You have access to delete all stored data as well."
                        />

                        <Rule
                            title="Your experience is secured by Vercel."
                            desc="Vercel, a trusted hosting platform used by major companies like Stripe, eBay, and Adobe, provides top-notch security with encryption and regular updates. Learn more: https://vercel.com/customers"
                            index={3}
                            tldr="Vercel ensures top-notch security for your experience, used by major companies."
                        />

                        <Rule
                            title="Your product is protected by Vercel’s firewall."
                            desc="Vercel employs a robust firewall to safeguard your data. Additionally, all requests to use AI are encrypted and secure, ensuring safe and reliable interactions. Learn more: https://vercel.com/docs/security/vercel-firewall"
                            index={4}
                            tldr="Vercel’s firewall and encryption protect your data and AI interactions."
                        />

                        <Rule
                            title="Framework security is built-in."
                            desc="The framework that made this website integrates strong security features, including automatic updates and secure handling of data."
                            index={5}
                            tldr="The framework ensures built-in security with automatic updates and secure data handling."
                        />

                        <Rule
                            title="Your data is protected with HTTPS."
                            desc="Vercel uses HTTPS to secure your connection. This keeps your personal information and data encrypted while being sent or received, ensuring no one can tamper with it, giving you peace of mind that your information is private and secure."
                            index={6}
                            tldr="HTTPS encrypts your data, keeping your information secure and private during transmission."
                        />

                        <Rule
                            title="Data is stored locally, not in an external server."
                            desc="Data is stored locally on your device using built-in web technology. This means that the data you choose to save remains on your device and isn't sent to external servers, ensuring enhanced privacy and control. "
                            index={7}
                            tldr="Data is kept on your device."
                        />
                        
                        <Rule
                            title="Curriculums are Stored Temporarily"
                            desc="To streamline the process of exporting the curriculum, we will temporarily store the data. If history tracking is enabled, the data will be preserved; otherwise, it will be automatically deleted upon re-loading. "
                            index={8}
                            tldr="To export, curriculums are stored temporarily."
                        />

                        <div className="w-full h-fit flex flex-col items-center text-center font-bold gap-1">
                            <p>Here is a diagram outlining the direction of where information goes (click the image to view fully):</p>
                            <Drawer>
                                <DrawerTrigger>
                                    <Image src={"/privacydiagram.png"} alt={"a diagram outlining direction of information"} width={900} height={500} />
                                </DrawerTrigger>
                                <DrawerContent className="w-full h-full flex flex-col items-center">
                                    <DrawerHeader>
                                        <DrawerTitle>Privacy Overview</DrawerTitle>
                                        <DrawerDescription>Click and drag from the top to the bottom to get out of this mode.</DrawerDescription>
                                    </DrawerHeader>
                                    <Image src={"/privacydiagram.png"} alt={"a diagram outlining direction of information"} width={1200} height={500} />
                                </DrawerContent>
                            </Drawer>
                        </div>

                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>

    </>
}

interface RuleIn {
    title: string;
    desc: string;
    index: number;
    tldr: string;
}

function Rule({ title, desc, index, tldr }: RuleIn) {
    return (
        <div className="flex flex-row h-fit gap-4 items-center">

            <div
                className="w-12 h-12 flex-shrink-0 bg-gray-700 flex items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ width: '3rem', height: '3rem' }} // Adjust the size here
            >
                {index}
            </div>
            <div className="flex flex-col justify-center">
                <h4 className="text-xl font-semibold tracking-tight dark:text-white text-black">
                    {title}
                </h4>
                <p className="leading-4 mt-1 dark:text-gray-300 text-gray-800">
                    {desc}
                </p>
                <blockquote className="mt-5 border-l-2 pl-6 leading-4 italic">
                    {tldr}
                </blockquote>
            </div>

        </div>
    );
}

