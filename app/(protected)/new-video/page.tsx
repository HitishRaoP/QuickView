'use client'

import { addVideo } from '@/actions/add-video'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import urlParser from "js-video-url-parser";
import { getVideoIdFromYoutube } from '@/actions/get-videoId-from-youtube'
import { Input } from '@/components/ui/input'
import { getUserCredits } from '@/data/get-user-credits'

export default function NewVideoPage() {
    const [url, setUrl] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const credits = await getUserCredits().then(res => res?.credits as number);
        if (credits < 1) {
            router.push('/pricing')
        } else {
            await toast.promise(addVideo(url), {
                loading: 'Adding video...',
                success: 'Video added successfully!',
                error: 'Error adding video',
            })
            const { videoId } = await getVideoIdFromYoutube(url);
            router.push(`/playground/?vid=${videoId}`);
        }
    }

    return (
        <div className="flex max-w-[784px] w-full mx-auto h-[calc(100vh-3.5rem)] flex-col gap-6 items-center justify-center p-6">
            <h1 className="text-pretty text-center text-[29px] font-semibold tracking-tighter sm:text-[32px] md:text-[46px]">
                What video can I help you with?
            </h1>
            <div className='w-full'>
                <form onSubmit={handleSubmit} className="relative border rounded-xl transition-colors dark:bg-[#141415]">
                    <div className="relative z-10 grid">
                        <Input
                            className="h-16 rounded-xl w-full flex-1 bg-transparent text-sm outline-none ring-0 placeholder:text-neutral-500 dark:text-neutral-200 font-semibold dark:bg-neutral-900"
                            placeholder="YouTube link here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <div className="flex justify-end items-center gap-2 p-3">
                            <Button
                                size={'icon'}
                                type="submit"
                                className='disabled:dark:bg-neutral-800 border rounded-lg disabled:dark:border-neutral-600 disabled:dark:text-neutral-400'
                                disabled={!urlParser.parse(url)}
                            >
                                <ArrowUp className="" />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}