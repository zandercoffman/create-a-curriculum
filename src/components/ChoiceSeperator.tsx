"use client"
import React from 'react';

interface Props {
    text: string;
    className: string | undefined;
}

export default function ChoiceSeparator(props: Props) {
    return (
        <div className={`w-full h-max flex flex-row gap-2 items-center ${props.className !== undefined && props.className}`}>
            <div className="flex-grow h-1 bg-gray-200"></div>
            <div className="whitespace-nowrap text-gray-500">{props.text.toUpperCase()}</div>
            <div className="flex-grow h-1 bg-gray-200"></div>
        </div>
    );
}
