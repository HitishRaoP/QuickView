'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import Markdown from "react-markdown";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSummaryFromRedis } from '@/data/get-summary-from-redis';
import { CopyButton } from '@/components/copy-button';

export function Summary() {
    const [summary, setSummary] = useState<String | null>('');
    const searchParams = useSearchParams();
    const videoId = searchParams.get('vid') as string;

    const router = useRouter();

    if (!videoId) {
        router.push('/new-video');
    }

    useEffect(() => {
        if (videoId) {
            getSummaryFromRedis(videoId).then(({ summary }) => {
                setSummary(summary);
            });
        }
    }, [videoId]);

    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)] rounded-xl border flex-1 p-6 text-justify w-full leading-loose">
            <div className='flex sticky  items-center justify-between pb-2 mb-2 border-b border-dashed'>
                <h1 className='text-3xl font-bold'>Summary</h1>
                <CopyButton text={summary as string} />
            </div>
            <Markdown>
                {summary as string}
            </Markdown>
        </ScrollArea>
    );
}