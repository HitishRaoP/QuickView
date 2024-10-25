import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import React from 'react'
import { FeedbackDialog } from './feedback-dialog'
import { CirclePlus, Plus } from 'lucide-react'

export const Header = () => {
    return (
        <header className='flex items-center justify-between p-2'>
            <SidebarTrigger />
            <div className='flex items-center gap-4'>
                <Link href={"/new-video"}>
                    <CirclePlus className='w-5 h-5' />
                </Link>
                <FeedbackDialog />
            </div>
        </header>
    )
}
