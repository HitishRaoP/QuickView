"use client"

import { useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

type CopyButtonProps = {
    text: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 1000);
        });
    };


    return (
        <Button
            size={"sm"}
            variant={"link"}
            onClick={handleCopy}
            className='hover:bg-none'
        >
            {copied ? <ClipboardCheck className='w-5 h-5 text-green-500' /> : <Clipboard className='w-5 h-5' />}
        </Button>
    );
};

export { CopyButton };
