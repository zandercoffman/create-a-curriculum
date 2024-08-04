"use client"

import { RotateCcw } from "lucide-react";
import {useEffect} from 'react'

export default function Page() {

    useEffect(() => {
        if (typeof window !== 'undefined')
            localStorage.clear();
    }, [])
    
    return <>
        <div className="w-screen h-screen grid place-items-center">
            <div className="flex flex-col gap-1 items-center text-center">
                <RotateCcw />
                You have been reset.
            </div>
        </div>
    </>
}